import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = firebase.initializeApp({
   apiKey: "AIzaSyAfBP5HGcthJ-Y0LkBOb7GqOxT3SgOKoTo",
  authDomain: "envision-overseas-counselor.firebaseapp.com",
  databaseURL: "https://envision-overseas-counselor-default-rtdb.firebaseio.com",
  projectId: "envision-overseas-counselor",
  storageBucket: "envision-overseas-counselor.appspot.com",
  messagingSenderId: "659593652599",
  appId: "1:659593652599:web:7e2853a3c5596985871972",
  measurementId: "G-LPEK41QYL2"
});



const storage = firebase.storage()
// const storageRef = firebase.storageRef()

export {storage, firebaseConfig as default}

