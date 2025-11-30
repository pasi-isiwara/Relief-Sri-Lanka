import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your Firebase config
// Get this from Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
 apiKey: "AIzaSyBZS3lMPMmIK7iqeEp5MFLWEzLTDiq6fTE",
  authDomain: "relief-sri-lanka.firebaseapp.com",
  projectId: "relief-sri-lanka",
  storageBucket: "relief-sri-lanka.firebasestorage.app",
  messagingSenderId: "429766737380",
  appId: "1:429766737380:web:0b425a55f61f5efdbadbf1",
  measurementId: "G-7CZ99DG7S0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);