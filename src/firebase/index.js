import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAlnzxOQ23ERnRZr4RiFRzAjeYfIQvJMUk",
  authDomain: "vsu-foundit-website.firebaseapp.com",
  projectId: "vsu-foundit-website",
  storageBucket: "vsu-foundit-website.appspot.com",
  messagingSenderId: "789199086367",
  appId: "1:789199086367:web:07f1800a9cb6b8bb15062a",
  measurementId: "G-GC73WCS6BK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db };
export { auth };
