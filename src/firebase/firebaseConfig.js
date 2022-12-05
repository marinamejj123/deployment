import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyC4PipekWPzxEzFFQuGAWGqrLBlGIIlQKI",
//     authDomain: "board-sw1.firebaseapp.com",
//     projectId: "board-sw1",
//     storageBucket: "board-sw1.appspot.com",
//     messagingSenderId: "865686831321",
//     appId: "1:865686831321:web:a630430ce136d1d3bd3ec8",
//     measurementId: "G-Z4P5VHM4QG"
// };
const firebaseConfig = {
  apiKey: "AIzaSyC12-pT-xI7kjGMpPpdHC-pJsO9SOhbbTo",
  authDomain: "prueba-f5fb9.firebaseapp.com",
  projectId: "prueba-f5fb9",
  storageBucket: "prueba-f5fb9.appspot.com",
  messagingSenderId: "465507356755",
  appId: "1:465507356755:web:cb13d7081e0578866eb6a6",
  measurementId: "G-C3QRQNDESS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
export const db = getFirestore(app);