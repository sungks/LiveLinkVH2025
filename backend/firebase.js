// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./livelink-5edc6-firebase-adminsdk-fbsvc-fadbbf5c29.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { db };
