import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
// import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe.js outside the component to avoid reloading it on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripeContainer = ({ amount }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={amount} />
    </Elements>
  );
};

export default StripeContainer;
