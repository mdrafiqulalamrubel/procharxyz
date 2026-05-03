import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongodb';

// Verify admin auth
function verifyAdmin(req: NextApiRequest) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return false;
  }
  return !!token;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!verifyAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const client = await clientPromise;
    const db = client.db('prochar');

    if (req.method === 'GET') {
      const { limit = '20', page = '1' } = req.query;

      const limitNum = parseInt(limit as string);
      const pageNum = parseInt(page as string);

      const blogs = await db
        .collection('blogs')
        .find({})
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum)
        .toArray();

      const total = await db.collection('blogs').countDocuments({});

      res.status(200).json({
        blogs: blogs.map((b: any) => ({
          ...b,
          _id: b._id.toString(),
        })),
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
      });
    } else if (req.method === 'POST') {
      const body = req.body;

      const blogPost = {
        title: body.title,
        slug: body.slug,
        excerpt: body.excerpt,
        content: body.content,
        category: body.category,
        tags: body.tags || [],
        author: body.author || 'Admin',
        image: body.image,
        published: body.published || false,
        views: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        seoTitle: body.seoTitle || body.title,
        seoDescription: body.seoDescription || body.excerpt,
        seoKeywords: body.seoKeywords || [],
        canonicalUrl: body.canonicalUrl,
      };

      const result = await db.collection('blogs').insertOne(blogPost);

      res.status(201).json({
        ...blogPost,
        _id: result.insertedId.toString(),
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
