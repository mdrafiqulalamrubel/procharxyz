// models/Blog.ts
import mongoose, { Schema, models } from 'mongoose';

const BlogSchema = new Schema({
  title:          { type: String, required: true },
  slug:           { type: String, required: true, unique: true },
  excerpt:        { type: String, default: '' },
  content:        { type: String, default: '' },   // Tiptap HTML string
  category:       { type: String, default: '' },
  tags:           { type: [String], default: [] },
  author:         { type: String, default: 'Admin' },
  image:          { type: String, default: '' },   // cover image URL or base64
  coverImage:     { type: String, default: '' },
  published:      { type: Boolean, default: false },
  views:          { type: Number, default: 0 },
  seoTitle:       { type: String, default: '' },
  seoDescription: { type: String, default: '' },
  seoKeywords:    { type: [String], default: [] },
  canonicalUrl:   { type: String, default: '' },
}, { timestamps: true });

// Prevent model recompilation in dev hot-reload
export default models.Blog || mongoose.model('Blog', BlogSchema);
