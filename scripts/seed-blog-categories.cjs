const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

const defaultCategories = [
  { name: 'Tips & Tricks', slug: 'tips-tricks', description: 'Quick tips and tricks for email marketing' },
  { name: 'Automation', slug: 'automation', description: 'Email automation workflows and strategies' },
  { name: 'Analytics', slug: 'analytics', description: 'Email analytics and performance tracking' },
  { name: 'Strategy', slug: 'strategy', description: 'Email marketing strategies and best practices' },
  { name: 'E-commerce', slug: 'ecommerce', description: 'Email marketing for e-commerce businesses' },
  { name: 'Deliverability', slug: 'deliverability', description: 'Email deliverability and inbox placement' },
];

async function seedCategories() {
  if (!uri) {
    console.error('MONGODB_URI not set');
    process.exit(1);
  }

  let client;
  try {
    client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('prochar');
    const collection = db.collection('blog_categories');

    // Check if categories already exist
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`Blog categories already exist (${existingCount} found). Skipping seed.`);
      return;
    }

    // Insert default categories
    const result = await collection.insertMany(
      defaultCategories.map(cat => ({
        ...cat,
        createdAt: new Date(),
      }))
    );

    console.log(`✅ Seeded ${result.insertedCount} blog categories successfully!`);
    console.log('Categories added:', defaultCategories.map(c => c.name).join(', '));
  } catch (error) {
    console.error('Error seeding blog categories:', error);
    process.exit(1);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

seedCategories();
