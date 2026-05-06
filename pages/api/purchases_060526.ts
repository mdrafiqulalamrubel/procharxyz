import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, plan, amount, contactId, phone, companyName } = req.body;
  if (!email || !plan) return res.status(400).json({ error: 'Missing fields' });

  let client;
  try {
    client = await clientPromise;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Mongo connection error:', err);
    return res.status(500).json({ error: 'Database connection failed' });
  }
  const db = client.db(process.env.MONGODB_DB || 'crm');

  const doc = {
    name: name || null,
    email,
    plan,
    amount: amount || null,
    contactId: contactId || null,
    phone: phone || null,
    companyName: companyName || null,
    createdAt: new Date(),
  };

  const result = await db.collection('purchases').insertOne(doc);

  res.status(201).json({ id: result.insertedId });
}
