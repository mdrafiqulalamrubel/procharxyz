import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise, { isUsingInMemory } from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  let usingInMemory = false;
  try {
    usingInMemory = await isUsingInMemory();
  } catch (e) {
    // ignore
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crm');
    const adminCount = (await db.collection('admin').find().toArray()).length;
    return res.status(200).json({ usingInMemory, adminCount });
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('db-status error', e?.message || e);
    return res.status(500).json({ usingInMemory, error: String(e?.message || e) });
  }
}
