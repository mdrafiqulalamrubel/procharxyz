// pages/api/blog-categories/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../lib/mongodb';
import mongoose, { models, Schema } from 'mongoose';

// Inline model to avoid extra file
const CategorySchema = new Schema({ name: { type: String, required: true, unique: true } }, { timestamps: true });
const Category = models.BlogCategory || mongoose.model('BlogCategory', CategorySchema);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    const cats = await Category.find().sort({ name: 1 }).lean();
    return res.status(200).json(cats);
  }

  if (req.method === 'POST') {
    try {
      const { name } = req.body;
      if (!name?.trim()) return res.status(400).json({ error: 'Name required' });
      const cat = await Category.create({ name: name.trim() });
      return res.status(201).json(cat);
    } catch (err: any) {
      if (err.code === 11000) return res.status(409).json({ error: 'Category already exists' });
      return res.status(500).json({ error: String(err) });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
