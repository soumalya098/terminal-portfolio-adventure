
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgfuBmAdJcfIh1A7OabvkgyaA40WO2AI0",
  projectId: "portfolio-35c61",
  appId: "1:175824764352:web:219f0e4f4807fbd1ee5c25",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
