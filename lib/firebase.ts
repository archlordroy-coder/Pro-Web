import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pro-informatique.firebaseapp.com",
  projectId: "pro-informatique",
  storageBucket: "pro-informatique.firebasestorage.app",
  messagingSenderId: "591192837161",
  appId: "1:591192837161:web:aa8ff3d3f1bfd976b5a038"
};

// Initialiser seulement si côté client et si la clé est présente
const app = !getApps().length && process.env.NEXT_PUBLIC_FIREBASE_API_KEY 
  ? initializeApp(firebaseConfig) 
  : getApps().length > 0 ? getApp() : null;

export const auth = app ? getAuth(app) : null;
