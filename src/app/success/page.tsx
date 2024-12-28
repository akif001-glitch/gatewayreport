import React from 'react';

const SuccessPage: React.FC = () => {
  return (
    <div style={{ margin: '50px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Payment Successful</h1>
      <p>Your payment was successful! Thank you for using Payoneer.</p>
      <p>Note: The payment may take some time to process.</p>
    </div>
  );
};

export default SuccessPage;
