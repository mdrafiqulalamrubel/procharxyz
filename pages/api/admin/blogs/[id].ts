import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import slug from 'slug';
import clientPromise from '../../../../lib/mongodb';

// Verify admin auth
function verifyAdmin(req: NextApiRequest) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  return !!token;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!verifyAdmin(req)) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'prochar_crm');
      const { id } = req.query;
      const idStr = id as string;
      const isObjectId = ObjectId.isValid(idStr);
      const query = isObjectId ? { _id: new ObjectId(idStr) } : { _id: idStr };

      if (req.method === 'GET') {
        const blog = await db.collection('blogs').findOne(query as any);

        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }

        res.status(200).json({
          ...blog,
          _id: blog._id && typeof blog._id.toString === 'function' ? blog._id.toString() : blog._id,
        });
      } else if (req.method === 'PUT') {
        const body = req.body;

        // Generate new slug from title if title changed
        const newSlug = body.title ? slug(body.title).toLowerCase() : body.slug;

        const result = await db.collection('blogs').updateOne(query as any, {
          $set: {
            title: body.title,
            slug: newSlug,
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
        });

        res.status(200).json({ modifiedCount: result.modifiedCount });
      } else if (req.method === 'DELETE') {
        const result = await db.collection('blogs').deleteOne(query as any);

        res.status(200).json({ deletedCount: result.deletedCount });
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
