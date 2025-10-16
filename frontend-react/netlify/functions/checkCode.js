exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    const { code, name, email, phone } = body;

    if (!code || !name || !email) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'code, name and email are required.' }),
      };
    }

    // Optional: restrict allowed codes by setting VALID_CODES env var (comma separated)
    const validCodesEnv = process.env.VALID_CODES || '';
    const validCodes = validCodesEnv.split(',').map(s => s.trim()).filter(Boolean);
    if (validCodes.length && !validCodes.includes(code)) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Invalid code.' }),
      };
    }

    // Airtable configuration (set these as Netlify environment variables)
    const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Registrations';

    if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Server not configured (missing Airtable keys).' }),
      };
    }

    const record = {
      fields: {
        Code: code,
        Name: name,
        Email: email,
        Phone: phone || '',
        CreatedAt: new Date().toISOString(),
      },
    };

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`;
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Failed to save registration.', details: text }),
      };
    }

    const respJson = await resp.json();
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Registration saved.', record: respJson }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Server error.', error: err.message }),
    };
  }
};
