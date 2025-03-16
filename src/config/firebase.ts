
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgZDih4EQT8BsuBca36REVJwr7rDQOR0k",
  projectId: "portfolio-5db1a",
  appId: "1:629464461166:web:947e4e0df48a0b7602db7f",
  authDomain: "portfolio-5db1a.firebaseapp.com",
  storageBucket: "portfolio-5db1a.appspot.com",
  messagingSenderId: "629464461166",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
