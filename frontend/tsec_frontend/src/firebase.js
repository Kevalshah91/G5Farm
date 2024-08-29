import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDKFBQa0Ln8arcSiTICIA0Cn4gABYnNU0Q",
  authDomain: "g5farmer.firebaseapp.com",
  projectId: "g5farmer",
  storageBucket: "g5farmer.appspot.com",
  messagingSenderId: "1058874492736",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
