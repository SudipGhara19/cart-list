import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyB2mQX_0bxZ0s6W7H2BKt51sA_R3qsrZ2M",
    authDomain: "cart-50990.firebaseapp.com",
    projectId: "cart-50990",
    storageBucket: "cart-50990.appspot.com",
    messagingSenderId: "462578674566",
    appId: "1:462578674566:web:604ad3683a90111c0d1a07"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <App />
  
);
