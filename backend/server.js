const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

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
// server.js




const upload = multer({ dest: 'uploads/' });

app.post('/api/upload-snipped-image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Optionally, process the file or store additional data here

  // Respond with the image URL or path
  res.status(200).json({
    message: 'File uploaded successfully',
    imageUrl: `/uploads/${req.file.filename}`
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));