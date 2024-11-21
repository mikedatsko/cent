// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMIK_iIMXg16I0q3IoO2H7G6KGRCiFtLk",
  authDomain: "budget-156ec.firebaseapp.com",
  projectId: "budget-156ec",
  storageBucket: "budget-156ec.appspot.com",
  messagingSenderId: "424811785117",
  appId: "1:424811785117:web:981502635884c70e291d74",
  measurementId: "G-73STNEBQ8V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

module.exports = db;
