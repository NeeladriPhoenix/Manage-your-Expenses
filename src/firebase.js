import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCD1lE1v5_Z-fbUS75qYOrFOIB9D1Ef4DY",
  authDomain: "manage-expenses-62681.firebaseapp.com",
  projectId: "manage-expenses-62681",
  storageBucket: "manage-expenses-62681.appspot.com",
  messagingSenderId: "766278445064",
  appId: "1:766278445064:web:5d9a2e8964af0b587fc9bd",
  measurementId: "G-3XD90L142W",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
var auth = firebase.auth();
var provider = new firebase.auth.GoogleAuthProvider();

export default db;
export { auth, provider };
