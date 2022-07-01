// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6trtgwZmR7DxBM0nS_YD1sD2KNIiVQQ8',
  authDomain: 'glints-assignment-4c7fb.firebaseapp.com',
  projectId: 'glints-assignment-4c7fb',
  storageBucket: 'glints-assignment-4c7fb.appspot.com',
  messagingSenderId: '418162188992',
  appId: '1:418162188992:web:f5f20563ad4d6ae2d7c325',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
