import firebase from "firebase/app";
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBajeHRYgomOvzUakEw0cVT0WRlojpNq6c",
    authDomain: "fb-crud-react-edb94.firebaseapp.com",
    projectId: "fb-crud-react-edb94",
    storageBucket: "fb-crud-react-edb94.appspot.com",
    messagingSenderId: "691235446551",
    appId: "1:691235446551:web:a530724a33f0eb07b3e152"
  };
  // Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

export const db = fb.firestore();