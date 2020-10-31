import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyBkUCT_8Q0KFwxgblDD1Si3BwVHpeq-ggI",
    authDomain: "wired-name-293817.firebaseapp.com",
    databaseURL: "https://wired-name-293817.firebaseio.com",
    projectId: "wired-name-293817",
    storageBucket: "wired-name-293817.appspot.com",
    messagingSenderId: "980788447562",
    appId: "1:980788447562:web:ce5c03c134aef2648f99b3",
    measurementId: "G-5WJXVLJZTZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  const storage = firebase.storage();

  export {
      storage, firebase as default
  };