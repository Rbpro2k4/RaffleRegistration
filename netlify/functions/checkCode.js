const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = 'crcraffle';
const codesCollection = 'codes';
const registrationsCollection = 'registrations';
const usedCodesCollection = 'used_codes';

let cachedClient = null;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ""
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  const { code, name, email, phone } = JSON.parse(event.body);

  if (!code || !name || !email || !phone) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'All fields are required.' }),
    };
  }

  try {
    if (!cachedClient) {
      cachedClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      await cachedClient.connect();
    }
    const db = cachedClient.db(dbName);

    // Check if code exists
    const codeDoc = await db.collection(codesCollection).findOne({ code });
    if (!codeDoc) {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Registration Unsuccessful' }),
      };
    }

    // Register user
    const registration = { name, email, phone, code, registeredAt: new Date() };
    await db.collection(registrationsCollection).insertOne(registration);

    // Move code to used_codes and remove from codes
    await db.collection(usedCodesCollection).insertOne(codeDoc);
    await db.collection(codesCollection).deleteOne({ code });

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Registration Successful' }),
    };
  } catch (error) {
    console.log("Function error:", error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: "Unable to register. Code invalid." })
    };
  }
};
