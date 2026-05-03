// pages/api/admin/blogs/index.ts
// Admin only — list ALL blogs (published + draft) + create new
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../../lib/mongodb';
import Blog from '../../../../models/Blog';

export const config = { api: { bodyParser: true } };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const page  = Math.max(1, parseInt(req.query.page as string)  || 1);
      const limit = Math.max(1, parseInt(req.query.limit as string) || 20);
      const skip  = (page - 1) * limit;

      const filter: any = {};
      if (req.query.published !== undefined) filter.published = req.query.published === 'true';
      if (req.query.category)  filter.category = req.query.category;

      const total = await Blog.countDocuments(filter);
      const blogs = await Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean();

      return res.status(200).json({ blogs, total });
    } catch (err) {
      return res.status(500).json({ error: String(err) });
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body;
      if (!body.title?.trim()) return res.status(400).json({ error: 'Title is required' });

      // Ensure slug is unique
      let baseSlug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      let finalSlug = baseSlug;
      let count = 1;
      while (await Blog.exists({ slug: finalSlug })) {
        finalSlug = `${baseSlug}-${count++}`;
      }

      const blog = await Blog.create({ ...body, slug: finalSlug });
      return res.status(201).json(blog);
    } catch (err) {
      return res.status(500).json({ error: String(err) });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
