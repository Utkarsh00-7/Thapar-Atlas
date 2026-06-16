import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC-W5GpLn6PArv29iUArnWoeKjMU7KOpsM",
  authDomain: "thapar-atlas.firebaseapp.com",
  projectId: "thapar-atlas",
  storageBucket: "thapar-atlas.firebasestorage.app",
  messagingSenderId: "864277328128",
  appId: "1:864277328128:web:62c6581bcaedcc1d5143e5",
  measurementId: "G-6VJ2GSJMB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
export const db = getFirestore(app);
