import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, message, phone, companyName, address, plan } = req.body;
  if (!email) return res.status(400).json({ error: 'Missing email' });

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
    message: message || null,
    phone: phone || null,
    companyName: companyName || null,
    address: address || null,
    plan: plan || null,
    createdAt: new Date(),
  };

  const result = await db.collection('contacts').insertOne(doc);

  res.status(201).json({ id: result.insertedId });
}
