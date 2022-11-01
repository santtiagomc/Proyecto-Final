import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import style from "./Stripe.module.css";

const stripePromsie = loadStripe(
  "pk_test_51LwtGzGm2004ZMTNJJTuwMAa47xnU7d3mDoI861T6xSLy0Y2eFsvDzDK5k3RgHGk8WOW711HbHNy6GvCDog76CgJ00GhqRZpD8"
);

export default function Stripe() {
  const cart = useSelector((state) => state.cart);

  console.log(cart);
  return (
    <div className={style.container}>
      <div className={style.product}>
        <h5 className={style.precioUnidad}>Precio Unidad</h5>
        {cart.length &&
          cart.map((product) => {
            return <div className={style.detail}>
            <div className={`col-7 text-center ${style.detail_product}`}>
              <img
                src={product.image}
                alt="Portada"
                className={style.detail_img}
              ></img>
              <div className={style.detail_info}>
                <Link to={`/detail/${product.id}`}>
                  <h2 className={style.detail_info_h2}>{product.name}</h2>
                </Link>
                <h5 className={style.detail_info_h4}>{product.author}</h5>
              </div>
            </div>
            <h3 className={`col-2 text-center ${style.detail_price}`}>
              {product.price}$
            </h3>
            <hr className={style.hr}/>
            </div>
          })}
            <div className={style.total}>Total</div>
            <div className={style.totalPrice}>{cart.length && 
              Math.round(cart.reduce((acc, act) => acc + Number(act.price * act.quantity), 0))}
            $
            </div>  
      </div>
      <div className={style.payment}>
        <Elements stripe={stripePromsie}>
          <CheckoutForm cart={cart} />
        </Elements>
      </div>
    </div>
  );
}

const CheckoutForm = ({ cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      setLoading(true);
      if (!error) {
        const { id } = paymentMethod;
        console.log(id);
        console.log(paymentMethod);
        const res = await axios.post("http://localhost:3001/checkout", {
          stripeId: id,
          cart: cart,
        });
        history.push("/profile");
        console.log(res);
        Swal.fire({
          title: "Producto comprado correctamente",
          width: 650,
          icon: "success",
          iconColor: "#355070",
          background: "#19191a",
          color: "#e1e1e1",
          confirmButtonColor: "#355070",
          confirmButtonText: `<a href="http://localhost:3000/profile">Aceptar</a>`,
        });
      }
    } catch (error) {
      // console.log(error);
      console.log(error);
      console.log(error.response.data.messageError);
      if (error.response) {
        if (
          error.response.data.messageError ===
          "Your card was declined. Your request was in test mode, but used a non test (live) card. For a list of valid test cards, visit: https://stripe.com/docs/testing."
        )
          setError("Esta tarjeta fue declinada");
        else if (error.response.data.messageError === "Your card was declined.")
          setError("Tu tarjeta fue rechazada");
        else if (
          error.response.data.messageError ===
          "Your card has insufficient funds."
        )
          setError("Tu tarjeta no tiene fondos suficientes");
        else if (error.response.data.messageError === "Your card has expired.")
          setError("Tu tarjeta ha expirado");
        else if (
          error.response.data.messageError ===
          "Your card's security code is incorrect."
        )
          setError("El codigo de seguridad es incorrecto");
        else setError("Un error ha ocurrido");
      }
      // setError(error.response.data.messageError);
    }
    setLoading(false);
  };
  return (
      <div className={style.stripeContainer}>
    <form className={style.stripeControl} onSubmit={handleSubmit}>
        <h1 className={style.pagar}>Pagar</h1>
        <CardElement className={style.pay} />
        {error && <p className={style.err}>{error}</p>}
        <form className={style.form}>
          <input
              className={style.input}
              type="text"
              placeholder="Provincia"
          ></input>
          <input
            className={style.input}
            type="text"
            placeholder="Ciudad"
          ></input>
          <input
            className={style.input}
            type="text"
            placeholder="Dirección"
          ></input>
          <input
            className={style.input}
            type="text"
            placeholder="Código Postal"
          ></input>
        </form>
        <button className={style.button}>
          {loading ? (
            <div className={style.loaderContainer}>
              <span className={style.loader}></span>
            </div>
          ) : (
          `Pagar ${cart.length && 
              Math.round(cart.reduce((acc, act) => acc + Number(act.price * act.quantity), 0))} $`
          )}
        </button>
    </form>
      </div>
  );
};