import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import "firebase/compat/firestore"

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAuYz6BmJeggIzfmfPqxcbLVe7mZ_Rn1xg",
  authDomain: "proyectofinal-2bcd9.firebaseapp.com",
  projectId: "proyectofinal-2bcd9",
  storageBucket: "proyectofinal-2bcd9.appspot.com",
  messagingSenderId: "775208417954",
  appId: "1:775208417954:web:d5f39d50694ce1c035b5fb"
});

// Initialize Firebase