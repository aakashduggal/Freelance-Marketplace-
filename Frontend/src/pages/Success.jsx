import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const { sendRequest } = useFetch();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await sendRequest('https://freelance-marketplace-c0gx.onrender.com/api/orders', {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payment_intent })
        });
      } catch (error) {
        console.error("Order confirmation failed:", error);
      }
    };

    if(payment_intent) {
        makeRequest();
    }

    // Always redirect after 5 seconds, even if payment intent is missing or API fails
    const timer = setTimeout(() => {
        navigate("/gigs");
    }, 5000);

    return () => clearTimeout(timer);
  }, [payment_intent, navigate, sendRequest]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl text-green-500">✓</span>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order is being processed and you are being redirected to your orders page.
        </p>
        
        <div className="text-indigo-600 font-semibold animate-pulse">
            Redirecting in a few seconds...
        </div>
      </div>
    </div>
  );
};

export default Success;
