import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";

import style from "./Stripe.module.css";

const stripePromsie = loadStripe(
  "pk_test_51LwtGzGm2004ZMTNJJTuwMAa47xnU7d3mDoI861T6xSLy0Y2eFsvDzDK5k3RgHGk8WOW711HbHNy6GvCDog76CgJ00GhqRZpD8"
);

export default function Stripe() {
  const cart = useSelector((state) => state.cart);

  console.log(cart);
  return (
    <div className={style.container}>
      {/* <div>
        {cart.length &&
          Math.round(cart.reduce((acc, act) => acc + Number(act.price), 0))}
      </div> */}
      <Elements stripe={stripePromsie}>
        <CheckoutForm cart={cart} />
      </Elements>
    </div>
  );
}

const CheckoutForm = ({ cart }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //    Esto de abajo para el back, hay que hacer la action
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (!error) {
        const { id } = paymentMethod;
        console.log(id);
        console.log(paymentMethod);
        const res = await axios.post("http://localhost:3001/checkout", {
          stripeId: id,
          cart: cart,
        });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data.messageError);
    }
  };
  return (
    <form className={style.stripeControl} onSubmit={handleSubmit}>
      <CardElement />
      <button>Comprar</button>
    </form>
  );
};