import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD4ddy4_DlUK82nELhLnQHTEwEmce0pHc4",
  authDomain: "react-firebase-todo-4d3f6.firebaseapp.com",
  databaseURL: "https://react-firebase-todo-4d3f6.firebaseio.com",
  projectId: "react-firebase-todo-4d3f6",
  storageBucket: "react-firebase-todo-4d3f6.appspot.com",
  messagingSenderId: "334743776764",
  appId: "1:334743776764:web:fa9cbdcedfef767a5d1679",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
