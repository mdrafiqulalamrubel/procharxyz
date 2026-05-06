// pages/api/contacts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { sendContactEmail } from '../../lib/email-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  let client;
  let insertedId = null;

  try {
    client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crm');

    const doc = {
      name: name || null,
      email,
      subject: subject || null,
      message,
      type: 'contact_form',
      createdAt: new Date(),
      status: 'new',
    };

    const result = await db.collection('contacts').insertOne(doc);
    insertedId = result.insertedId;
    console.log('✅ Contact saved to MongoDB:', { id: insertedId, email });
  } catch (dbError) {
    console.error('MongoDB error:', dbError);
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // Send email notification to rar@daffodil.group
  const emailResult = await sendContactEmail({ name, email, subject, message });

  res.status(201).json({
    success: true,
    id: insertedId,
    emailSent: emailResult.success,
    message: 'Thank you! We will get back to you soon.',
  });
}