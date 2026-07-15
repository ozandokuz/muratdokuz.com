import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhzIwXxClqxM7dGZQ_2EHyvvexIhEmiEg",
  authDomain: "muratdokuz-f8e5b.firebaseapp.com",
  projectId: "muratdokuz-f8e5b",
  storageBucket: "muratdokuz-f8e5b.firebasestorage.app",
  messagingSenderId: "945077600421",
  appId: "1:945077600421:web:9e5bb1cf3e72b5bd004d4c",
  measurementId: "G-N6KCB2KK3V"
};

// Next.js (SSR) uyumluluğu için: Eğer app başlatılmadıysa başlat, başlatıldıysa var olanı kullan.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
