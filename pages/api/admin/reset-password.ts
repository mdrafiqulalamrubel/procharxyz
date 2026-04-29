import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import clientPromise from '../../../lib/mongodb';
import { getTokenFromReq, verifyToken } from '../../../utils/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const token = getTokenFromReq(req);
  const payload = verifyToken(token);
  if (!payload || !payload.email) return res.status(401).json({ error: 'Not authenticated' });

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Missing fields' });

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  if (!ADMIN_EMAIL) return res.status(500).json({ error: 'Admin not configured' });

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'crm');

    // Check existing admin record
    const admin = await db.collection('admin').findOne({ email: ADMIN_EMAIL });
    let valid = false;
    if (admin && admin.passwordHash) {
      valid = bcrypt.compareSync(currentPassword, admin.passwordHash);
    } else {
      // fallback to env password
      const envPass = process.env.ADMIN_PASSWORD || '';
      valid = (bcrypt.compareSync(currentPassword, envPass) || currentPassword === envPass);
    }

    if (!valid) return res.status(401).json({ error: 'Current password is incorrect' });

    const newHash = bcrypt.hashSync(newPassword, 10);

    // upsert admin document
    await db.collection('admin').updateOne(
      { email: ADMIN_EMAIL },
      { $set: { email: ADMIN_EMAIL, passwordHash: newHash, updatedAt: new Date() } },
      { upsert: true }
    );

    return res.status(200).json({ ok: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('reset-password error', e);
    return res.status(500).json({ error: 'Server error' });
  }
}
