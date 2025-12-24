// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7_L8xSXWMbdRc3vGmoW_7ruo0SrrF4ow",
  authDomain: "crud-e7aa1.firebaseapp.com",
  databaseURL: "https://crud-e7aa1-default-rtdb.firebaseio.com",
  projectId: "crud-e7aa1",
  storageBucket: "crud-e7aa1.firebasestorage.app",
  messagingSenderId: "71268190718",
  appId: "1:71268190718:web:ae99a8243e69d88b65d8af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;