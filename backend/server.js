// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { db } = require('./firebase');
const { client, serviceSid } = require('./twilio');

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('LiveLink API is running 🎉');
});

// Send code (Twilio Verify)
app.post('/send-code', async (req, res) => {
  const { phone } = req.body;

  try {
    const verification = await client.verify.v2
      .services(serviceSid)
      .verifications.create({ to: phone, channel: 'sms' });

    res.status(200).send({ success: true, message: 'Code sent' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err.message });
  }
});

// Verify code and login
app.post('/verify-code', async (req, res) => {
  const { phone, code } = req.body;

  try {
    const verificationCheck = await client.verify.v2
      .services(serviceSid)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status === 'approved') {
      // Optional: Add user to Firestore
      const userRef = db.collection('users').doc(phone);
      await userRef.set({
        phone,
        lastLogin: new Date()
      }, { merge: true });

      res.status(200).send({ success: true, message: 'User verified' });
    } else {
      res.status(401).send({ success: false, message: 'Invalid code' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LiveLink server running on http://localhost:${PORT}`);
});
