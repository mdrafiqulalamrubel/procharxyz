import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;
  if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  let client;
  try {
    client = await clientPromise;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Mongo connection error:', err);
    return res.status(500).json({ error: 'Database connection failed' });
  }

  const db = client.db(process.env.MONGODB_DB || 'crm');

  try {
    // Check if email already subscribed
    const existing = await db.collection('newsletter_subscribers').findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'Already subscribed', alreadySubscribed: true });
    }

    // Add new subscriber
    const doc = {
      email,
      subscribedAt: new Date(),
      status: 'active',
      source: 'footer',
    };

    const result = await db.collection('newsletter_subscribers').insertOne(doc);

    return res.status(201).json({
      id: result.insertedId,
      message: 'Successfully subscribed to weekly tips!',
      success: true,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Newsletter subscribe error:', e);
    return res.status(500).json({ error: 'Failed to subscribe' });
  }
}
