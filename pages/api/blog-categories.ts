import { NextApiRequest, NextApiResponse } from 'next';
import slug from 'slug';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('prochar');

    if (req.method === 'GET') {
      const categories = await db.collection('blog_categories').find({}).toArray();

      res.status(200).json(
        categories.map((c: any) => ({
          ...c,
          _id: c._id.toString(),
        }))
      );
    } else if (req.method === 'POST') {
      const auth = req.headers.authorization;
      if (!auth?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const body = req.body;

      const category = {
        name: body.name,
        slug: slug(body.name).toLowerCase(),
        description: body.description || '',
        createdAt: new Date(),
      };

      const result = await db.collection('blog_categories').insertOne(category);

      res.status(201).json({
        ...category,
        _id: result.insertedId.toString(),
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
