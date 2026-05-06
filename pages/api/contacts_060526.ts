// pages/api/contacts.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';
import { Resend } from 'resend';

// Initialize Resend only if API key exists
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Email template (same as before)
const generateEmailHTML = (data: any) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; border: 1px solid #e5e5e5; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #555; }
          .value { background: white; padding: 10px; border-radius: 5px; margin-top: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          <div class="content">
            ${data.name ? `<div class="field"><div class="label">Name:</div><div class="value">${data.name}</div></div>` : ''}
            <div class="field"><div class="label">Email:</div><div class="value">${data.email}</div></div>
            ${data.phone ? `<div class="field"><div class="label">Phone:</div><div class="value">${data.phone}</div></div>` : ''}
            ${data.companyName ? `<div class="field"><div class="label">Company:</div><div class="value">${data.companyName}</div></div>` : ''}
            ${data.plan ? `<div class="field"><div class="label">Plan:</div><div class="value">${data.plan}</div></div>` : ''}
            ${data.message ? `<div class="field"><div class="label">Message:</div><div class="value">${data.message.replace(/\n/g, '<br>')}</div></div>` : ''}
          </div>
        </div>
      </body>
    </html>
  `;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, phone, companyName, address, plan } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  let client;
  let insertedId = null;

  // Step 1: Save to MongoDB
  try {
    client = await clientPromise;
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
      status: 'new',
    };

    const result = await db.collection('contacts').insertOne(doc);
    insertedId = result.insertedId;
    
    console.log('✅ Contact saved to MongoDB:', { id: insertedId, email });
    
  } catch (dbError) {
    console.error('MongoDB error:', dbError);
    return res.status(500).json({ error: 'Database connection failed' });
  }

  // Step 2: Try to send email (but don't fail the request if email fails)
  let emailSent = false;
  let emailWarning = null;

  if (resend && process.env.EMAIL_FROM && process.env.EMAIL_TO) {
    try {
      const { data, error } = await resend.emails.send({
        from: process.env.EMAIL_FROM,
        to: [process.env.EMAIL_TO],
        replyTo: email,
        subject: `Contact Form${plan ? ` - ${plan} Plan` : ''}${name ? ` from ${name}` : ''}`,
        html: generateEmailHTML({ name, email, message, phone, companyName, address, plan }),
      });

      if (error) {
        console.warn('⚠️ Email not sent:', error.message);
        emailWarning = error.message;
        
        // Special handling for domain verification error
        if (error.message.includes('verify a domain')) {
          emailWarning = 'Email notification not sent - domain verification pending. Contact saved to database.';
        }
      } else {
        emailSent = true;
        console.log('✅ Email sent via Resend:', { id: data?.id });
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      emailWarning = emailError instanceof Error ? emailError.message : 'Unknown email error';
    }
  } else {
    console.log('ℹ️ Email not configured - skipping notification');
    emailWarning = 'Email service not configured';
  }

  // Return success response (email is optional)
  res.status(201).json({
    success: true,
    id: insertedId,
    emailSent,
    ...(emailWarning && { emailWarning }),
    message: emailSent 
      ? 'Contact saved and email notification sent' 
      : 'Contact saved successfully (email notification not sent - ' + emailWarning + ')'
  });
}