require('dotenv').config();

const express  = require('express');
const axios    = require('axios');
const cors     = require('cors');
const path     = require('path');

// ✅ CORRECT cohere import (latest SDK)
const cohereImport = require("cohere-ai");
const cohere = new cohereImport.CohereClient({
  token: process.env.COHERE_API_KEY,
});

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.get('/verify-phone', async (req, res) => {
  const { number, country_code = 'US' } = req.query;

  try {
    const { data } = await axios.get('http://apilayer.net/api/validate', {
      params: {
        access_key: process.env.NUMVERIFY_API_KEY,
        number,
        country_code,
        format: 1,
      },
    });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Phone verification failed.' });
  }
});

app.post('/recommend', async (req, res) => {
  const { eventType, groupSize } = req.body;

  try {
    const prompt = `Suggest a fun, creative, and practical event idea for "${eventType}" with ${groupSize}.`;

    const response = await cohere.generate({
      model: "command",
      prompt,
      max_tokens: 150,
      temperature: 0.8,
    });

    const recommendation = response.generations[0].text.trim();
    res.json({ recommendation });
  } catch (err) {
    console.error("Cohere API error:", err);
    res.status(500).json({ error: "Failed to get recommendation from AI." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

/*
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const { db } = require('./firebase');
const { client, serviceSid } = require('./twilio');

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('LiveLink API is running 🎉');
});

// Step 1: Validate number, then send code
app.post('/start-verification', async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).send({ message: 'Phone number required' });

  try {
    // ✅ Numverify step
    const numverify = await axios.get(`http://apilayer.net/api/validate`, {
      params: {
        access_key: process.env.NUMVERIFY_API_KEY,
        number: phone
      }
    });

    if (!numverify.data.valid) {
      return res.status(400).send({ success: false, message: 'Invalid phone number' });
    }

    // ✅ Twilio step (send SMS)
    const twilioRes = await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phone, channel: 'sms' });

    res.status(200).send({
      success: true,
      message: 'Verification code sent',
      carrier: numverify.data.carrier
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
});

// Step 2: Verify code
app.post('/verify-code', async (req, res) => {
  const { phone, code } = req.body;

  try {
    const verification = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phone, code });

    if (verification.status === 'approved') {
      await db.collection('users').doc(phone).set({
        phone,
        verifiedAt: new Date()
      }, { merge: true });

      res.status(200).send({ success: true, message: 'Phone verified' });
    } else {
      res.status(401).send({ success: false, message: 'Invalid code' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err.message });
  }
});

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LiveLink API running on http://localhost:${PORT}`);
});
*/