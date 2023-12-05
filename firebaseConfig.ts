import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_FIREBASE_APPID
// };

const firebaseConfig = {
  apiKey: "AIzaSyA6mN8uC_JqLrMoZnv1Idhe5fHLxBYVGx8",
  authDomain: "sustainability-68d64.firebaseapp.com",
  databaseURL: "https://sustainability-68d64-default-rtdb.firebaseio.com",
  projectId: "sustainability-68d64",
  storageBucket: "sustainability-68d64.appspot.com",
  messagingSenderId: "824869331906",
  appId: "1:824869331906:web:0ca54110d4c46692dbac5b",
  measurementId: "G-T8455DTMK9"
};

const app = initializeApp(firebaseConfig);

export const trashStorage = getStorage(app);