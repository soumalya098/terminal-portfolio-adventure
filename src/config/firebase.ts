
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCgfuBmAdJcfIh1A7OabvkgyaA40WO2AI0",
  projectId: "portfolio-35c61",
  appId: "1:175824764352:web:219f0e4f4807fbd1ee5c25",
  authDomain: "portfolio-35c61.firebaseapp.com",
  storageBucket: "portfolio-35c61.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
