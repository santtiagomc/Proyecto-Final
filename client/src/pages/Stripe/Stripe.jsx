import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import style from "./Stripe.module.css";

const stripePromsie = loadStripe(
  "pk_test_51LwtGzGm2004ZMTNJJTuwMAa47xnU7d3mDoI861T6xSLy0Y2eFsvDzDK5k3RgHGk8WOW711HbHNy6GvCDog76CgJ00GhqRZpD8"
);

export default function Stripe() {
  return (
    <div className={style.container}>
      <Elements stripe={stripePromsie}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //    Esto de abajo para el back, hay que hacer la action
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    // if (!error)
    console.log(error, paymentMethod);
  };
  return (
    <form className={style.stripeControl} onSubmit={handleSubmit}>
      <CardElement />
      <button>Comprar</button>
    </form>
  );
};
