// pages/api/uploads/[...slug].ts
// Serves files from the public/uploads directory.
// This allows runtime uploads to be accessed even after a static build.

import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    // Larger response limit for large images
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract the file name from the URL e.g. /api/uploads/filename.png
  const { slug } = req.query;
  // slug can be string or string[]; we only expect a single segment
  const filename = Array.isArray(slug) ? slug[0] : slug;
  if (!filename) {
    return res.status(400).json({ error: 'Missing filename' });
  }

  const filePath = path.join(process.cwd(), 'public', 'uploads', filename);
  // Check existence and stream the file
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.status(404).json({ error: 'File not found' });
    }
    const readStream = fs.createReadStream(filePath);
    // Set appropriate Content-Type based on extension (basic fallback)
    const ext = path.extname(filename).toLowerCase();
    const mimeMap: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.gif': 'image/gif',
    };
    res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
    // Add caching headers for better performance
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    readStream.pipe(res);
  });
}
