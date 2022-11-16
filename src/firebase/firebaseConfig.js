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
  apiKey: "AIzaSyAxlKIe0C_C2CUbc3JSAU5mWaiNqZtDHUk",
  authDomain: "board-sw1-efc4e.firebaseapp.com",
  projectId: "board-sw1-efc4e",
  storageBucket: "board-sw1-efc4e.appspot.com",
  messagingSenderId: "785550220807",
  appId: "1:785550220807:web:11a16844b2db18c9ac14a2",
  measurementId: "G-J7CSCFP0Q2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
export const db = getFirestore(app);