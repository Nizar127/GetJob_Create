import Firebase from 'firebase';

let firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
// Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);
export const db = app.database()
export const auth = app.auth()
export const storage = app.storage()
