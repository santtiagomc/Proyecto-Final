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
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useUser } from "../../helpers/useUser";
import Error from "../../components/Error/Error";

import style from "./Stripe.module.css";

const stripePromsie = loadStripe(
  "pk_test_51LwtGzGm2004ZMTNJJTuwMAa47xnU7d3mDoI861T6xSLy0Y2eFsvDzDK5k3RgHGk8WOW711HbHNy6GvCDog76CgJ00GhqRZpD8"
);

export default function Stripe() {
  const cart = useSelector((state) => state.cart);
  const [user, load] = useUser();
  const history = useHistory();

  if (!load && user === undefined) {
    return <Error error="Necesitas iniciar sesion para comprar" />;
  }

  return (
    <>
      <div className={style.container}>
        <button className={style.backButton} onClick={() => history.goBack()}>
          <AiOutlineArrowLeft className={style.btn} />
        </button>
        <div className={style.product}>
          <div className={style.stock}>
            <h5 className={style.priceStock}>Producto</h5>
            <h5 className={style.priceStock}>Precio Unidad</h5>
          </div>
          <hr className={style.hr} />
          <div className={style.detail}>
            {cart.length &&
              cart.map((product) => (
                <div className={style.bookInfo}>
                  <div className={style.detailProduct}>
                    <img
                      src={product.image}
                      alt="Portada"
                      className={style.detailImg}
                    ></img>

                    <div className={style.detailInfo}>
                      <Link to={`/detail/${product.id}`}>
                        <h2 className={style.detail_info_h2}>{product.name}</h2>
                      </Link>
                      <h5 className={style.detail_info_h4}>{product.author}</h5>
                      <div className={style.infoProduct}>
                        <p className={style.quantityProduct}>
                          Cantidad: {product.quantity}
                        </p>
                        <p className={style.detail_price}>{product.price}$</p>
                      </div>
                    </div>
                  </div>

                  <hr className={style.hr} />
                </div>
              ))}
          </div>
          <div className={style.prices}>
            <span className={style.total}>Total</span>
            <span className={style.totalPrice}>
              {cart.length &&
                Math.round(
                  cart.reduce(
                    (acc, act) => acc + Number(act.price * act.quantity),
                    0
                  )
                )}
              $
            </span>
          </div>
        </div>
        <div className={style.payment}>
          <Elements stripe={stripePromsie}>
            <CheckoutForm cart={cart} history={history} user={user} />
          </Elements>
        </div>
      </div>
    </>
  );
}

const CheckoutForm = ({ cart, history, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
          userId: user,
        });
        history.push("/profile");
        console.log(res);
        Swal.fire({
          title: "Producto comprado correctamente",
          text: "Te enviaremos un correo con la información de tu compra!",
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
    <>
      <h1 className={style.pagar}>Pagar</h1>
      <form className={style.stripeControl} onSubmit={handleSubmit}>
        <CardElement className={style.pay} />
        {error && <p className={style.err}>{error}</p>}
        <input
          className={style.input}
          type="text"
          placeholder="Provincia"
        ></input>
        <input className={style.input} type="text" placeholder="Ciudad"></input>
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
        <button className={style.button}>Pagar</button>
      </form>
    </>
  );
};
