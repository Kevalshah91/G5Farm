const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
const serviceAccount = require('./g5farmer-firebase-adminsdk-psnhq-804b94b15e.json'); // Download this JSON file from Firebase Console
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

// API route for verifying Firebase ID token
app.post('/verify-token', async (req, res) => {
  const idToken = req.body.token;

  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    res.status(200).send(decodedToken);
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
