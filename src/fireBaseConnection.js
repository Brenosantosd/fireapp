import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyApUyGzAEqHWC8qHug30KGZVman4smHgF4",
  authDomain: "curso-fdfdb.firebaseapp.com",
  projectId: "curso-fdfdb",
  storageBucket: "curso-fdfdb.firebasestorage.app",
  messagingSenderId: "823518139557",
  appId: "1:823518139557:web:5d583a4078b6ac4811a94c",
  measurementId: "G-7YDXN75JFH"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)

export {db}; 