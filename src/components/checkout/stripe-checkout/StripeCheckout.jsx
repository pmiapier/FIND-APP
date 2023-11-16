import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js';
import InputField from '../../inputs/InputField';

export default function StripeCheckout() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRenteeSubmit = async (e) => {
    e.preventDefault();
    const line_items = [
      {
        quantity: 1,
        price_data: {
          currency: 'thb',
          unit_amount: 15000,
          product_data: {
            name: 'กระเป๋าสะพาย แบรนด์ CODE',
            description: 'โย่วและนี้คือเสียงจากระเป๋าที่คุณกำลังจะเช่า ฉันมันโครตเบา สะพายง่าย ถอดยาก',
            images: [
              'https://images.pexels.com/photos/12456282/pexels-photo-12456282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            ]
          }
        }
      }
    ];
    const response = await axios.post('/create-checkout-session', {
      line_items,
      customer_email: 'test@tee.t'
    });
    const { sessionId } = response.data;
    const { error } = await stripe.redirectToCheckout({
      sessionId
    });
    if (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleRenteeSubmit}>
      <div>
        <InputField type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" value={email} />
      </div>
      <button className="bg-blue-500 text-white p-4"> Checkout </button>
    </form>
  );
}
