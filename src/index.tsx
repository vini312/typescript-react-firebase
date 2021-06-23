import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseAppProvider } from 'reactfire';
import { BrowserRouter } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyCo4YMdT1Y_KIAdyBQ7Q9KtOZ5B-dDVwj8",
  authDomain: "react-products-f684c.firebaseapp.com",
  projectId: "react-products-f684c",
  storageBucket: "react-products-f684c.appspot.com",
  messagingSenderId: "531163728200",
  appId: "1:531163728200:web:b85f4446b096c7a21a0b7d"
};

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseAppProvider>,
  document.getElementById('root')
);