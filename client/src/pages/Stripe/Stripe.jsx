import React from "react";
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
 
import "./Stripe.module.css";

const stripePromsie = loadStripe("pk_test_51LwtGzGm2004ZMTNJJTuwMAa47xnU7d3mDoI861T6xSLy0Y2eFsvDzDK5k3RgHGk8WOW711HbHNy6GvCDog76CgJ00GhqRZpD8")

export default function Stripe() {

    const CheckoutForm = () => {

        const stripe = useStripe();
        const elements = useElements();
        return <form className="form-group"
        onSubmit={handleSubmit}>
            <CardElement className="from-control"/>
            <button>
                Comprar
            </button>
        </form>
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("HOla")

    //    Esto de abajo para el back, hay que hacer la action
        const { error, paymentMethod } = await Stripe.createPaymentMethod({
            type: "card",
            card: Elements.getElement(CardElement) 
        })
    }

    return (
            <Elements stripe={stripePromsie} >
                <CheckoutForm />
            </Elements>
    )
}