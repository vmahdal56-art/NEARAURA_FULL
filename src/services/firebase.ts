import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgIh_ZzHO2yRjx-QVSj4jlxRTAzsvi3m8",
  authDomain: "huddleme.firebaseapp.com",
  projectId: "huddleme",
  storageBucket: "huddleme.firebasestorage.app",
  messagingSenderId: "134960009847",
  appId: "1:134960009847:web:sovereign_eye_2026"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Funkce musí být explicitně exportována jako "named export"
export const getLedgerSnapshot = (callback: (data: any[]) => void) => {
  const q = query(
    collection(db, "ledger"),
    orderBy("timestamp", "desc"),
    limit(50)
  );

  return onSnapshot(q, (snapshot) => {
    const logs = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(logs);
  }, (error) => {
    console.error("Chyba synchronizace Ledgeru:", error);
  });
};

export default app;