// Usage: node scripts/seed-admin.cjs
// This is CommonJS so it works when package.json has "type": "module".
require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function run() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || 'prochar_crm';
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!uri) return console.error('MONGODB_URI not set in .env');
  if (!email || !password) return console.error('ADMIN_EMAIL or ADMIN_PASSWORD not set in .env');

  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const hash = bcrypt.hashSync(password, 10);
    const res = await db.collection('admin').updateOne(
      { email },
      { $set: { email, passwordHash: hash, updatedAt: new Date() } },
      { upsert: true }
    );
    console.log('Upsert result:', res.result || res);
    const count = await db.collection('admin').countDocuments({});
    console.log('admin collection count:', count);
  } catch (e) {
    console.error('Error seeding admin:', e);
  } finally {
    await client.close();
  }
}

run();
