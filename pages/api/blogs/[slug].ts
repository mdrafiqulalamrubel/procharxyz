import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'prochar_crm');
    const { slug } = req.query;

    if (req.method === 'GET') {
      const blog = await db.collection('blogs').findOne({ slug: slug, published: true });

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      // Increment views
      await db.collection('blogs').updateOne(
        { _id: blog._id },
        { $inc: { views: 1 } }
      );

      res.status(200).json({
        ...blog,
        _id: blog._id.toString(),
        views: blog.views + 1,
      });
    } else if (req.method === 'PUT') {
      // Check admin auth
      const auth = req.headers.authorization;
      if (!auth?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const body = req.body;

      const result = await db.collection('blogs').updateOne(
        { slug: slug },
        {
          $set: {
            title: body.title,
            excerpt: body.excerpt,
            content: body.content,
            category: body.category,
            tags: body.tags || [],
            author: body.author,
            image: body.image,
            published: body.published,
            updatedAt: new Date(),
            seoTitle: body.seoTitle,
            seoDescription: body.seoDescription,
            seoKeywords: body.seoKeywords,
            canonicalUrl: body.canonicalUrl,
          },
        }
      );

      res.status(200).json({ modifiedCount: result.modifiedCount });
    } else if (req.method === 'DELETE') {
      // Check admin auth
      const auth = req.headers.authorization;
      if (!auth?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const result = await db.collection('blogs').deleteOne({ slug: slug });

      res.status(200).json({ deletedCount: result.deletedCount });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
