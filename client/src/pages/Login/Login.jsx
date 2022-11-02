import { useEffect, useState } from "react";
import { sessionGoogle, singIn } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, postCart } from "../../redux/actions";
import Swal from "sweetalert2";
import Loader from "../Home/GIF_aparecer_BooksNook.gif";
import style from "./Login.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Login() {
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, userDb } = useSelector((state) => state);
  const [loader, setLoader] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  //---------------- Pasar carrito de invitado a base de datos de usuario cuando inicia sesión ---------------

  let repeatedIdArrayCart = [];
  let uniqueIdArrayCart = [];
  if (localStorage.length && localStorage.cart) {
    repeatedIdArrayCart = localStorage.getItem("cart").split(",");
    uniqueIdArrayCart = [...new Set(repeatedIdArrayCart)];
  }

  useEffect(() => {
    if (user && user.uid) {
      setLoader(true);
      if (userDb && userDb.role === "Usuario") {
        if (uniqueIdArrayCart.length) {
          dispatch(postCart({ userId: user.uid, bookId: [false], suma: true }));
          setTimeout(() => {
            setLoader(false);
            Swal.fire({
              title: "Tienes productos en tu carrito de invitado",
              width: 650,
              text: "¿Quieres pasar estos productos a tu carrito de usuario?",
              icon: "warning",
              iconColor: "#355070",
              showCancelButton: true,
              background: "#19191a",
              color: "#e1e1e1",
              confirmButtonColor: "#355070",
              cancelButtonColor: "#B270A2",
              confirmButtonText: "¡Si! Guardar carrito",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(
                  postCart({
                    userId: user.uid,
                    bookId: uniqueIdArrayCart,
                    suma: true,
                  })
                );
                setLoader(true);
                setTimeout(function () {
                  dispatch(getUserCart(user.uid));
                  localStorage.clear();
                }, 1900);
                setTimeout(() => {
                  history.goBack();
                }, 2000);
              } else {
                history.goBack();
              }
            });
          }, 2000);
        } else {
          setTimeout(() => {
            history.goBack();
          }, 1000);
        }
      } else {
        // localStorage.clear();
        history.push("/");
      }
    }
  }, [userDb, dispatch, history]);

  //---------------- END Pasar carrito de invitado a base de datos de usuario cuando inicia sesión ---------------

  const handleGoogle = async () => {
    try {
      await sessionGoogle();
    } catch (error) {
      console.log("Este es el error: " + error);
    }
  };

  const onSubmit = async (user) => {
    try {
      await singIn(user.email, user.password);
    } catch (error) {
      setError("Usuario o contraseña incorrecto");
      console.log(error);
    }
  };

  return (
    <div className={style.login_body}>
      <div className={style.volverContainer}>
        <button className={style.btnBack} onClick={() => history.goBack()}>
          <AiOutlineArrowLeft className={style.btnArr} />
        </button>
      </div>
      {!loader ? (
        <div className={style.container}>
          <h2 className={style.login}>Ingresar</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <hr></hr>
            <div className={style.container_input}>
              <input
                required
                className={style.inputLogin}
                type="text"
                {...register("email", {
                  required: true,
                })}
              ></input>
              <span></span>
              <label className={style.labelText}>Correo</label>
              {errors.email?.type === "required" && (
                <p className={style.error}>Obligatorio</p>
              )}
            </div>
            <div className={style.container_input}>
              <input
                required
                className={style.inputLogin}
                type="password"
                {...register("password", {
                  required: true,
                })}
              ></input>
              <span></span>
              <label className={style.labelText}>Contraseña</label>
              {errors.password?.type === "required" && (
                <p className={style.error}>Obligatorio</p>
              )}
            </div>
            <button className={style.button_form}>Iniciar sesión</button>
            {error && <p className={style.ver}>{error}</p>}
            <div className={style.google} onClick={handleGoogle}>
              Iniciar sesión con Google
            </div>
            <Link to="/register">
              <p className={style.link}>¿No tienes una cuenta? Registrate</p>
            </Link>
          </form>
        </div>
      ) : (
        <img className={style.loader} src={Loader} alt="Loader" />
      )}
    </div>
  );
}
