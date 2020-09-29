import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCx4Ldjy0enrkYAi7_KNgcjLO6f7MDjMPM",
    authDomain: "bottino-2f50a.firebaseapp.com",
    databaseURL: "https://bottino-2f50a.firebaseio.com",
    projectId: "bottino-2f50a",
    storageBucket: "bottino-2f50a.appspot.com",
    messagingSenderId: "552478036132",
    appId: "1:552478036132:web:071a57eff28eeaa39f5631",
    measurementId: "G-0SPX69GQSD"
  };
  firebase.initializeApp(firebaseConfig);

  export default firebase;