import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export function getTokenFromReq(req: NextApiRequest) {
  const cookie = req.headers.cookie;
  if (!cookie) return null;
  const match = cookie.split(';').map(s => s.trim()).find(s => s.startsWith('token='));
  if (!match) return null;
  return match.split('=')[1];
}

export function verifyToken(token?: string | null) {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string };
  } catch (e) {
    return null;
  }
}
