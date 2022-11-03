import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useUser } from "../../helpers/useUser";
import { useForm } from "react-hook-form";
import Error from "../../components/Error/Error";

import style from "./Stripe.module.css";
import { POST_CHECKOUT_RESPONSE } from "../../redux/actions";
import templateAlert from "../../helpers/templateAlert";

const stripePromsie = loadStripe(
  "pk_test_51LwtGzGm2004ZMTNJJTuwMAa47xnU7d3mDoI861T6xSLy0Y2eFsvDzDK5k3RgHGk8WOW711HbHNy6GvCDog76CgJ00GhqRZpD8"
);

export default function Stripe() {
  const cart = useSelector((state) => state.cart);
  const [user, load] = useUser();
  const [address, setAddress] = useState({});
  const history = useHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async (userId) => {
      try {
        const res = await axios.get(`/user/${userId}`);
        setAddress(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (!load) getUser(user);
  }, [user, load]);

  if (!load && user === undefined) {
    return <Error error="Necesitas iniciar sesion para comprar" />;
  }

  return loading ? (
    <div>Cargando</div> // poner imagen y estilos de loader
  ) : (
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
          <CheckoutForm
            cart={cart}
            history={history}
            user={user}
            address={address}
          />
        </Elements>
      </div>
    </div>
  );
}

const CheckoutForm = ({ cart, history, user, address }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });
      setLoading(true);
      if (!error) {
        const { id } = paymentMethod;
        if (
          !address.province ||
          !address.city ||
          !address.address ||
          !address.zipCode
        ) {
          await axios.put("/user", {
            ...data,
            id: user,
          });
        }
        const res = await axios.post("/checkout", {
          stripeId: id,
          cart: cart,
          user: { ...data, email: address.email, fullName: address.fullName },
        });
        dispatch({ type: POST_CHECKOUT_RESPONSE, payload: res.data });
        setLoading(false);
        templateAlert(
          "Compra realizada!",
          "Tu compra está siendo procesada, te hemos enviado un email con toda la información",
          "success",
          5000
        );
        history.push("/profile");
      }
    } catch (error) {
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
      <form className={style.stripeControl} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.containerBuy}>
          <CardElement className={style.pay} />
          {error && <p className={style.err}>{error}</p>}
          {/* <input
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
        <button className={style.button}>Pagar</button> */}
          <div className={style.inputContainer}>
            <input
              className={style.input}
              placeholder="Provincia"
              // value={address.province}
              {...register("province", {
                maxLength: 40,
                minLength: 5,
                value: address.province,
              })}
            ></input>
            {errors.province?.type === "maxLength" && (
              <p className={style.error}>maximo 40</p>
            )}
          </div>
          <div className={style.inputContainer}>
            <input
              className={style.input}
              placeholder="Ciudad"
              {...register("city", {
                maxLength: 40,
                value: address.city,
              })}
            ></input>
            {errors.city?.type === "maxLength" && (
              <p className={style.error}>maximo 40</p>
            )}
          </div>
          <div className={style.inputContainer}>
            <input
              className={style.input}
              placeholder="Dirección"
              {...register("address", {
                maxLength: 40,
                value: address.address,
              })}
            ></input>
            {errors.address?.type === "maxLength" && (
              <p className={style.error}>maximo 40</p>
            )}
          </div>
          <div className={style.inputContainer}>
            <input
              className={style.input}
              placeholder="Código Postal"
              {...register("zipCode", {
                maxLength: 5,
                pattern: /^[0-9]*$/,
                value: address.zipCode,
              })}
            ></input>
            {errors.zipCode?.type === "maxLength" && (
              <p className={style.error}>maximo 5</p>
            )}
            {errors.zipCode?.type === "pattern" && (
              <p className={style.error}>Solo numeros</p>
            )}
          </div>
        </div>
        <button className={style.button}>
          {loading ? (
            <span className={style.loaderBuy}></span>
          ) : (
            <span>Pagar</span>
          )}
        </button>
      </form>
    </>
  );
};
