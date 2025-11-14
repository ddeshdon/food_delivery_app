import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbH7WkxVzpJWdICCgOkkxZ4nf15Trvu70",
  authDomain: "fooddeliveryapp-612f5.firebaseapp.com",
  projectId: "fooddeliveryapp-612f5",
  storageBucket: "fooddeliveryapp-612f5.firebasestorage.app",
  messagingSenderId: "1089548103081",
  appId: "1:1089548103081:web:3e0e6fa73a7f09e31ae8b8",
  measurementId: "G-2610F8GN9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export default app;