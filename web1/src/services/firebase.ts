import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// ⚠️ ZDE VLOŽTE SVŮJ FIREBASE CONFIG
const firebaseConfig = {
  apiKey: "AIzaSy_PLACEHOLDER",
  authDomain: "huddleme-staging.firebaseapp.com",
  projectId: "huddleme-staging",
  storageBucket: "huddleme-staging.appspot.com",
  messagingSenderId: "123",
  appId: "1:123:web:123"
};

let app, db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch(e) { console.warn("Firebase Init Failed"); }

export const addToWaitlist = async (email: string) => {
    if(!db) throw new Error("No DB");
    await addDoc(collection(db, "waitlist"), { 
        email, 
        timestamp: serverTimestamp(), 
        source: "web_fusion" 
    });
};