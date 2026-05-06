// simple script to verify Mongo connection using MONGODB_URI
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set in environment');
    process.exit(2);
  }

  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  try {
    await client.connect();
    const admin = client.db().admin();
    const info = await admin.ping();
    console.log('Mongo ping OK', info);
    const dbName = process.env.MONGODB_DB || client.db().databaseName || 'default';
    const collections = await client.db(dbName).collections();
    console.log(`Connected to DB: ${dbName}, collections: ${collections.map(c => c.collectionName).join(', ')}`);
    process.exit(0);
  } catch (err) {
    console.error('Mongo connection failed:', err.message || err);
    process.exit(3);
  } finally {
    try { await client.close(); } catch (e) {}
  }
}

run();
