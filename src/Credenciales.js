// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAupAPcXFYXdo27_cEHPdsjv3i0Vccps5s",
  authDomain: "nft-656f6.firebaseapp.com",
  projectId: "nft-656f6",
  storageBucket: "nft-656f6.appspot.com",
  messagingSenderId: "517681707618",
  appId: "1:517681707618:web:43454da04b31425884af3b",
  measurementId: "G-ZZS4ETQWZQ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export default firebaseApp