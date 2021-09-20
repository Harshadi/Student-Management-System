import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = firebase.initializeApp({
   apiKey: "AIzaSyAooYDfsWNmAfzsktgzCS2tUi67ToWFDQ8",
  authDomain: "envision-counselor-portal.firebaseapp.com",
  projectId: "envision-counselor-portal",
  storageBucket: "envision-counselor-portal.appspot.com",
  messagingSenderId: "1070382041976",
  appId: "1:1070382041976:web:f068f3ed3d7b645403168d",
  measurementId: "G-NY6FJPJXKM"
});



const storage = firebase.storage()
// const storageRef = firebase.storageRef()

export {storage, firebaseConfig as default}

