// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4KhqfjlUB6e6lrHSVR3GccIyROjXwbmw",
  authDomain: "moneyminder-2f446.firebaseapp.com",
  projectId: "moneyminder-2f446",
  storageBucket: "moneyminder-2f446.appspot.com",
  messagingSenderId: "11741618744",
  appId: "1:11741618744:web:6278f03e91ce0497ebbccd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
