import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import useFetch from "../hooks/useFetch";

// Publishable Key test (Replace with your actual pk_test)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY); 

export default function Pay() {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();
  const { sendRequest } = useFetch();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const data = await sendRequest(`https://freelance-marketplace-c0gx.onrender.com/api/orders/create-payment-intent/${id}`, {
          method: "POST"
        });
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Payment intent creation error", error);
      }
    };
    makeRequest();
  }, [id, sendRequest]);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#4f46e5', // indigo-600
    },
  };
  
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Secure Checkout
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Complete your payment to finalize the order
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {clientSecret ? (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ) : (
          <div className="flex justify-center items-center h-48 bg-white rounded-xl shadow-xl p-6">
            <div className="text-indigo-600 text-lg font-medium animate-pulse">Loading secure connection...</div>
          </div>
        )}
      </div>
    </div>
  );
}
