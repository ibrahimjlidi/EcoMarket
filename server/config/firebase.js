const admin = require('firebase-admin');
const serviceAccount = require('C:/Users/brahim/Downloads/serviceAccountKey.json'); // Replace with the path to your service account key JSON file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://ecomarket-23.firebaseio.com', // Replace with your Firebase project URL
});

const db = admin.firestore();

module.exports = { admin, db };
