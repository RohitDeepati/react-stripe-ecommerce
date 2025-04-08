import axios from "axios";

const stripeApi = axios.create({
  baseURL: "https://go-stripe-ecommerce-production.up.railway.app/payments",
});

export const paymentIntentApi = (data) =>
  stripeApi.post("/create-payment-intent", data);

export const checkoutSessionApi = (data) =>
  stripeApi.post("/checkout-session", data);

export const GetCheckoutSessionDeatils = (session_id) =>
  stripeApi.get(`/order/success?session_id=${session_id}`);
