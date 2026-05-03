// pages/api/blogs/[slug].ts
// Public endpoint — fetch single published blog by slug, increment views
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { slug } = req.query;

  try {
    await connectDB();

    const blog = await Blog.findOneAndUpdate(
      { slug, published: true },
      { $inc: { views: 1 } },   // increment view count on each visit
      { new: true }
    ).lean();

    if (!blog) return res.status(404).json({ error: 'Blog not found' });

    return res.status(200).json(blog);
  } catch (err) {
    console.error('[/api/blogs/slug] error:', err);
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
}
