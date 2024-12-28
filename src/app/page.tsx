"use client";
import React, { useState } from 'react';

const PaymentPage: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [message, setMessage] = useState<string>('');
  const [payoneerLink, setPayoneerLink] = useState<string>('');

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    try {
      const response = await fetch(`/api/create-payment-intent?amount=${amount}&currency=${currency}&paymentMethod=${paymentMethod}`);
      if (response.ok) {
        const { payoneerLink } = await response.json();
        setPayoneerLink(payoneerLink);
        setMessage('');
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to create payment link. Please try again.');
      }
    } catch{
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className='bg-yellow-100 text-black text-center pb-40 rounded-3xl shadow-white shadow-xl' style={{ margin: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1 className='text-4xl pb-20 pt-10 font-extrabold font-serif'>Custom Payment Gateway</h1>
      <div className='flex flex-col items-center'>
        <label className='text-xl font-semibold' htmlFor="amount">Enter Amount: </label>
        <input
          className='px-4 py-2 rounded-2xl mb-10 shadow-black shadow-lg'
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label className='text-xl font-semibold' htmlFor="currency">Select Currency: </label>
        <input
          className='px-4 py-2 rounded-2xl mb-10 shadow-black shadow-lg'
          type="text"
          id="currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          placeholder="e.g., USD, PKR"
        />
        <label className='text-xl font-semibold' htmlFor="paymentMethod">Select Payment Method: </label>
        <select
          className='px-4 py-2 rounded-2xl mb-20 shadow-black shadow-lg'
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="card">Card</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="paypal">PayPal</option>
        </select>
        <button className='bg-blue-500 hover:text-yellow-100 hover:bg-black text-white rounded-lg px-10 font-extrabold py-5 mb-10' onClick={handlePayment} style={{ marginTop: '20px' }}>
          Pay Now
        </button>
      </div>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      {payoneerLink && <p className=''>
        Click on the below payment link: <br /> <a href={payoneerLink} target="_blank" rel="noopener noreferrer">{payoneerLink}</a></p>}
    </div>
  );
};

export default PaymentPage;
