import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  // Clear token cookie
  res.setHeader('Set-Cookie', `token=; HttpOnly; Path=/; Max-Age=0`);
  res.status(200).json({ ok: true });
}
