import React from "react";
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
 
import style from "../Stripe/Stripe.module.css"

const stripePromsie = loadStripe("pk_test_51LwtGzGm2004ZMTNJJTuwMAa47xnU7d3mDoI861T6xSLy0Y2eFsvDzDK5k3RgHGk8WOW711HbHNy6GvCDog76CgJ00GhqRZpD8")

export default function Stripe() {

    const stripe = useStripe();

    const handleSubmit = (e) => {
        e.preventDefault();

        //Esto de abajo para el back, hay que hacer la action
        stripe.createPaymentMethod({
            type: "card",
            card: useElements(CardElement) 
        })
    }

    return (
        <Elements stripe={stripePromsie}>
            <form>
                <CardElement/>
            </form>
        </Elements>
    )
}