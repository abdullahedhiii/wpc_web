import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPage from "./PaymentPage";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const PaymentWrapper = () => {
  return (
    <Elements stripe={stripePromise} options={{locale: "en-GB"}}>
      <PaymentPage />
    </Elements>
  );
};

export default PaymentWrapper;
