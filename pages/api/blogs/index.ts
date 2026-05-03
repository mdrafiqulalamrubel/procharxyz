// pages/api/blogs/index.ts
// Public endpoint — returns only PUBLISHED blogs
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import Blog from '../../../models/Blog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    await connectDB();

    const page     = Math.max(1, parseInt(req.query.page as string)  || 1);
    const limit    = Math.max(1, parseInt(req.query.limit as string) || 9);
    const category = req.query.category as string | undefined;
    const search   = req.query.search   as string | undefined;

    // Build filter — ONLY published posts
    const filter: any = { published: true };
    if (category) filter.category = category;
    if (search)   filter.$or = [
      { title:   { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ];

    const skip  = (page - 1) * limit;
    const total = await Blog.countDocuments(filter);

    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      // Return content too so frontend can extract thumbnail image
      .select('title slug excerpt content category tags author image coverImage views createdAt')
      .lean();

    return res.status(200).json({ blogs, total, page, limit });
  } catch (err) {
    console.error('[/api/blogs] error:', err);
    return res.status(500).json({ error: 'Server error', detail: String(err) });
  }
}
