import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { getTokenFromReq, verifyToken } from '../../../utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = getTokenFromReq(req);
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Unauthorized' });

  let client;
  try {
    client = await clientPromise;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Mongo connection error:', err);
    return res.status(500).json({ error: 'Database connection failed' });
  }
  const db = client.db(process.env.MONGODB_DB || 'crm');

  const customers = await db.collection('contacts').find().sort({ createdAt: -1 }).limit(100).toArray();

  res.status(200).json({ customers });
}
