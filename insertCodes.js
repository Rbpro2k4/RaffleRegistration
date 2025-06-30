const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = 'crcraffle';
const collectionName = 'codes';

async function insertCodes() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const codes = [
      { code: "ABC123" },
      { code: "XYZ789" }
    ];
    await db.collection(collectionName).insertMany(codes);
    console.log('Codes inserted!');
  } finally {
    await client.close();
  }
}

insertCodes();
