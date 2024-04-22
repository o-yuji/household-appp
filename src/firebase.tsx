// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-ekiP88khpE8M-92kg3SEddu0C2Vy7eM",
  authDomain: "householdtypescript-627c6.firebaseapp.com",
  projectId: "householdtypescript-627c6",
  storageBucket: "householdtypescript-627c6.appspot.com",
  messagingSenderId: "716545608056",
  appId: "1:716545608056:web:c942e0aa5d4cb6d3be608d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }