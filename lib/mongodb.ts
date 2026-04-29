import { MongoClient } from 'mongodb';
import { randomUUID } from 'crypto';

const uri = process.env.MONGODB_URI || '';
if (!uri) {
  // do not throw here — allow fallback to in-memory DB for local development
  // eslint-disable-next-line no-console
  console.warn('MONGODB_URI not set — using in-memory fallback DB');
}

let clientPromise: Promise<any>;

declare global {
  // allow global caching across module reloads in dev
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<any> | undefined;
}

class InMemoryClient {
  private store: Map<string, any[]> = new Map();
  public __isInMemory = true;

  db(_dbName?: string) {
    const store = this.store;
    return {
      collection(name: string) {
        if (!store.has(name)) store.set(name, []);
        return {
          insertOne: async (doc: any) => {
            const item = { ...doc, _id: doc._id ?? randomUUID() };
            store.get(name)!.unshift(item);
            return { insertedId: item._id };
          },
          find: (_filter?: any) => {
            const arr = store.get(name)!.slice();
            return {
              sort: (_sortObj: any) => ({
                limit: (n: number) => ({ toArray: async () => arr.slice(0, n) }),
              }),
              toArray: async () => arr,
            };
          },
          findOne: async (filter: any) => {
            const arr = store.get(name)!;
            if (!filter || Object.keys(filter).length === 0) return arr[0] ?? null;
            const keys = Object.keys(filter);
            return arr.find(item => keys.every(k => {
              const v = (filter as any)[k];
              if (v && typeof v === 'object' && v.$eq !== undefined) return item[k] === v.$eq;
              return item[k] === v;
            })) || null;
          },
          updateOne: async (filter: any, update: any, options?: any) => {
            const arr = store.get(name)!;
            const idx = arr.findIndex(item => {
              if (!filter || Object.keys(filter).length === 0) return false;
              return Object.keys(filter).every(k => item[k] === filter[k]);
            });
            if (idx !== -1) {
              if (update && update.$set) {
                arr[idx] = { ...arr[idx], ...update.$set };
              }
              return { matchedCount: 1, modifiedCount: 1 };
            }
            if (options && options.upsert) {
              const doc = { ...(update.$set || {}), _id: randomUUID() };
              arr.unshift(doc);
              return { matchedCount: 0, modifiedCount: 0, upsertedId: doc._id };
            }
            return { matchedCount: 0, modifiedCount: 0 };
          },
        };
      },
    };
  }
}

async function connectMongo() {
  if (!uri) {
    return new InMemoryClient();
  }

  const client = new MongoClient(uri);
  await client.connect();
  return client;
}

if (!global._mongoClientPromise) {
  global._mongoClientPromise = (async () => {
    try {
      const c = await connectMongo();
      return c;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Mongo connection error:', err);
      // fallback to an in-memory client so dev server remains functional
      return new InMemoryClient();
    }
  })();
}

clientPromise = global._mongoClientPromise as Promise<any>;

export default clientPromise;

export async function isUsingInMemory() {
  try {
    const c = await clientPromise;
    return !!(c && (c as any).__isInMemory);
  } catch (e) {
    return true;
  }
}
