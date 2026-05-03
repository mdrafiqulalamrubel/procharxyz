// lib/mongodb.ts
// Exports BOTH clientPromise (native driver) AND connectDB (mongoose)
// so existing code using clientPromise keeps working unchanged.

import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prochar_crm';

// ── Native driver (clientPromise) — for existing API files ──────────────────
declare global { var _mongoClientPromise: Promise<MongoClient> | undefined; }

const client = new MongoClient(MONGODB_URI);
const clientPromise: Promise<MongoClient> =
  global._mongoClientPromise ?? (global._mongoClientPromise = client.connect());

export default clientPromise;   // keeps `import clientPromise from '../../../lib/mongodb'` working

// ── Mongoose (connectDB) — for Blog model / new API files ───────────────────
let cached = (global as any)._mongoose as { conn: any; promise: any } | undefined;
if (!cached) { cached = (global as any)._mongoose = { conn: null, promise: null }; }

export async function connectDB() {
  if (cached!.conn) return cached!.conn;
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
