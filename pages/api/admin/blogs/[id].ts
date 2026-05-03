// pages/api/admin/blogs/[id].ts
// Admin only — GET / PUT / DELETE single blog by MongoDB _id
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../../lib/mongodb';
import Blog from '../../../../models/Blog';

export const config = { api: { bodyParser: true } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const blog = await Blog.findById(id).lean();
      if (!blog) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(blog);
    } catch (err) {
      return res.status(500).json({ error: String(err) });
    }
  }

  if (req.method === 'PUT') {
    try {
      const body = { ...req.body };
      delete body._id;       // never overwrite _id
      delete body.__v;
      delete body.createdAt;

      // If slug changed, ensure it's still unique (excluding self)
      if (body.slug) {
        const existing = await Blog.findOne({ slug: body.slug, _id: { $ne: id } });
        if (existing) {
          body.slug = `${body.slug}-${Date.now()}`;
        }
      }

      const blog = await Blog.findByIdAndUpdate(id, body, { new: true, runValidators: true }).lean();
      if (!blog) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(blog);
    } catch (err) {
      return res.status(500).json({ error: String(err) });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await Blog.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: String(err) });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
