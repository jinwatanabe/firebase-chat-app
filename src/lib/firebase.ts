import firebase from 'firebase/compat/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCXmocnsvDvyLXuQsL7CTsFf24eoFHVm6w",
  authDomain: "fir-chat-app-eb174.firebaseapp.com",
  projectId: "fir-chat-app-eb174",
  storageBucket: "fir-chat-app-eb174.appspot.com",
  messagingSenderId: "491901871070",
  appId: "1:491901871070:web:5d75aa40a65ea5e9bf334f"
})

export const db = getFirestore()
export const auth = getAuth()