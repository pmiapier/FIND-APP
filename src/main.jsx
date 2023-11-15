import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ModalContextProvider from './context/modalContext.jsx';
import AuthContextProvider from './context/AuthContext.jsx';
import 'react-toastify/dist/ReactToastify.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ProductContextProvider from './context/ProductContext.jsx';

const stripePromise = loadStripe(
  'pk_test_51Lc5TuKd2gin3hft1nk3iVBY1H5fMy53PJBAonHMkJuoCma9qDetTENYxqvdlSgaA4Ib2lRpNFPlmh6hlbseU3Hx00GXDJTZE8'
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Elements stripe={stripePromise}>
    <AuthContextProvider>
      <ProductContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </Elements>
  // </React.StrictMode>,
);
