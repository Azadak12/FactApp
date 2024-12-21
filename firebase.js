// Import necessary Firebase functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyD1FVbihz05b7JOHmdNQ-Hqs7Nopke0z9U",
  authDomain: "myfacta-2403c.firebaseapp.com",
  projectId: "myfacta-2403c",
  storageBucket: "myfacta-2403c.appspot.com",
  messagingSenderId: "81605323899",
  appId: "1:81605323899:web:e4518b85f4088f9c2106de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export the Firestore functions to be used in other files
export { db, collection, addDoc };
