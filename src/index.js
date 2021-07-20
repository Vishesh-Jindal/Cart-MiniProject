import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';

import './index.css';
import App from './App';

const firebaseConfig = {
  apiKey: 'AIzaSyDlwzlu_hqvkMpogM_5FQL7sAjxnbvHADU',
  authDomain: 'cart-819e7.firebaseapp.com',
  projectId: 'cart-819e7',
  storageBucket: 'cart-819e7.appspot.com',
  messagingSenderId: '572190902338',
  appId: '1:572190902338:web:0a9b9c0194f05563da05db',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
