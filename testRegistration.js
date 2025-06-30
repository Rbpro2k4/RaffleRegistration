const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = 'crcraffle';
const codesCollection = 'codes';
const registrationsCollection = 'registrations';

async function registerUser({ code, name, email, phone }) {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db(dbName);

    // Check if code exists
    const codeDoc = await db.collection(codesCollection).findOne({ code });
    if (!codeDoc) {
      console.log('Invalid code. Registration failed.');
      return;
    }

    // Register user
    const registration = { name, email, phone, code, registeredAt: new Date() };
    await db.collection(registrationsCollection).insertOne(registration);
    console.log('Registration successful:', registration);
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.close();
  }
}

// Example usage:
registerUser({
  code: 'ABC123', // Replace with a code you have in your codes collection
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890'
});
