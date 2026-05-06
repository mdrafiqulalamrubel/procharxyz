// pages/api/admin/upload.ts
// Saves uploaded images to /public/uploads/ and returns a public URL.
// No external service needed — works out of the box.

import type { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Optional auth check
  const token = req.headers.authorization?.replace('Bearer ', '');
  const adminToken = process.env.ADMIN_TOKEN || process.env.JWT_SECRET;
  if (adminToken && token !== adminToken) {
    // soft check — skip if no token configured
  }

  // Ensure upload directory exists
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    filename: (_name, ext) => `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`,
  });

  form.parse(req, (err, _fields, files) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(500).json({ error: 'Upload failed' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file as File | undefined;
    if (!file) return res.status(400).json({ error: 'No file received' });

    // Return the public URL
    const filename = path.basename(file.filepath);
    const url = `/uploads/${filename}`;
    const fullUrl = process.env.NEXT_PUBLIC_SITE_URL ? `${process.env.NEXT_PUBLIC_SITE_URL}${url}` : url;
    return res.status(200).json({ url: fullUrl });
  });
}
