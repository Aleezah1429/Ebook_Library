import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCFI-MESGzF6MAiIPAcL8ZYBCSTs75a4vo",
    authDomain: "ebook-library1429.firebaseapp.com",
    projectId: "ebook-library1429",
    storageBucket: "ebook-library1429.appspot.com",
    messagingSenderId: "390865880720",
    appId: "1:390865880720:web:52dd817a1ee70e070ffa15",
    measurementId: "G-W5SK71R7X6"
  };

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

// const analytics = firebase.getAnalytics(app);

export default fire;