// pages/api/purchases.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { sendPricingEmail } from '../../lib/email-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, companyName, message, plan } = req.body;

  if (!email || !plan) {
    return res.status(400).json({ error: 'Email and plan are required' });
  }

  let client;
  let insertedId = null;

  try {
    client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crm');

    const doc = {
      name: name || null,
      email,
      phone: phone || null,
      companyName: companyName || null,
      message: message || null,
      plan,
      type: 'pricing_signup',
      createdAt: new Date(),
      status: 'pending',
    };

    const result = await db.collection('purchases').insertOne(doc);
    insertedId = result.insertedId;
    console.log('✅ Purchase saved to MongoDB:', { id: insertedId, plan, email });
  } catch (dbError) {
    console.error('MongoDB error:', dbError);
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // Send email notification to rar@daffodil.group
  const emailResult = await sendPricingEmail({ name, email, plan, phone, companyName, message });

  res.status(201).json({
    success: true,
    id: insertedId,
    emailSent: emailResult.success,
    message: 'Thank you for your interest! We will contact you soon.',
  });
}