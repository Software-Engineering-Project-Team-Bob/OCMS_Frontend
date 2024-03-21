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


// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://uaihecdsbqbnjojbqhpm.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhaWhlY2RzYnFibmpvamJxaHBtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA4NTg5MTgsImV4cCI6MjAyNjQzNDkxOH0.IHOacUSJlOCz5rjeBkm8zaAPm1TCroLm8p6o1d8qsoI';

// const supabase = createClient(supabaseUrl, supabaseKey);


// const db = supabase.from('ocms');
// const { user, session, auth } = supabase.auth;
// const storage = supabase.storage;

// export { db, user, session, auth, storage };
