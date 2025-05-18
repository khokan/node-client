// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe2WUhwAs9SsgOX-C8i0BwAAc54EJP2Ms",
  authDomain: "coffee-store-app-bcb14.firebaseapp.com",
  projectId: "coffee-store-app-bcb14",
  storageBucket: "coffee-store-app-bcb14.firebasestorage.app",
  messagingSenderId: "209227140276",
  appId: "1:209227140276:web:72e498e1860fa9c3ea5be1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);