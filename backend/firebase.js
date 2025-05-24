// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./livelink-d9579-firebase-adminsdk-fbsvc-3356b2a905.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };
