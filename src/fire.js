// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8qMz9BKuG5XuTr2CO10f4H89758bErrc",
  authDomain: "chat-a712a.firebaseapp.com",
  projectId: "chat-a712a",
  storageBucket: "chat-a712a.appspot.com",
  messagingSenderId: "616084074495",
  appId: "1:616084074495:web:bf9749c99f303c649801ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);