import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyDufgEA4sgkNYvUZLTkJJtZkWYJTz1HEbI",
  authDomain: "classroom-a781f.firebaseapp.com",
  projectId: "classroom-a781f",
  storageBucket: "classroom-a781f.appspot.com",
  messagingSenderId: "187800199384",
  appId: "1:187800199384:web:1782e6eb0cb0dcd35237ad",
  measurementId: "G-2XPER4BNSH"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default db;

