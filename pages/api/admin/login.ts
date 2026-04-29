import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // plain text or hash in env
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

  if (!ADMIN_EMAIL) {
    return res.status(500).json({ error: 'Admin not configured' });
  }

  // First, try to read admin user from DB (if available)
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crm');
    const admin = await db.collection('admin').findOne({ email: ADMIN_EMAIL });
    if (admin && admin.passwordHash) {
      const ok = bcrypt.compareSync(password, admin.passwordHash);
      if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '8h' });
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${8 * 60 * 60}`);
      return res.status(200).json({ ok: true });
    }
  } catch (e) {
    // fall through to env-based check
    // eslint-disable-next-line no-console
    console.error('Admin DB check failed:', e);
  }

  // Fallback to environment-stored admin password
  const match = email === ADMIN_EMAIL && (bcrypt.compareSync(password, ADMIN_PASSWORD || '') || password === ADMIN_PASSWORD);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '8h' });
  res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=${8 * 60 * 60}`);
  res.status(200).json({ ok: true });
}
