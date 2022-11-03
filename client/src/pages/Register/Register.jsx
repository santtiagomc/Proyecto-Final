import { sessionGoogle, singUp } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import style from "./Register.module.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserCart, postCart, USER_CREATE_RESPONSE } from "../../redux/actions";
import Loader from "../Home/GIF_aparecer_BooksNook.gif";
import { AiOutlineArrowLeft } from "react-icons/ai";
import templateAlert from "../../helpers/templateAlert";

export default function Register() {
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user, userDb } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

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
      if (userDb && userDb.id) {
        if (uniqueIdArrayCart.length) {
          dispatch(postCart({ userId: userDb.id, bookId: [false], suma: true }));
          setTimeout(() => {
            setLoader(false);
            Swal.fire({
              title: "Has completado tu registro y tienes productos en tu carrito de invitado",
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
                    userId: userDb.id,
                    bookId: uniqueIdArrayCart,
                    suma: true,
                  })
                );
                setLoader(true);
                setTimeout(function () {
                  dispatch(getUserCart(userDb.id));
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
          templateAlert(
            "Registro completado!",
            "Te enviaremos un correo con tu información",
            "success",
            4000
          );
          setTimeout(() => {
            history.goBack();
          }, 1000);
        }
      }
    }
  }, [user, dispatch, history, userDb]);

  //---------------- END Pasar carrito de invitado a base de datos de usuario cuando inicia sesión ---------------

  //--------------------------sweetAlert de Correo Existente ----------------//
  const AlertError = () => {
    Swal.fire({
      icon: "warning",
      title: "Este correo ya se encuentra en uso",
      text: "Ingrese otro por favor",
      confirmButtonColor: "#355070",
      width: 650,
      background: "#19191a",
      color: "#e1e1e1",
    });
  };
  //--------------END sweetAlert -------------//

  const onSubmit = async (data) => {
    try {
      let response = await singUp(data);
      dispatch({ type: USER_CREATE_RESPONSE, payload: response })
    } catch (error) {
      AlertError();
      console.log(error);
    }
  };

  const handleSignInGoogle = async () => {
    try {
      let response = await sessionGoogle();
      dispatch({ type: USER_CREATE_RESPONSE, payload: response })
    } catch (error) {
      AlertError();
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
          <h2 className={style.login}>Crear cuenta</h2>
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <div className={style.container_input}>
              <input
                required
                className={style.input}
                // placeholder="Email"
                type="text"
                {...register("email", {
                  required: true,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                })}
              ></input>
              <span></span>
              <label className={style.labelText}>Correo</label>
              {errors.email?.type === "required" && (
                <p className={style.error}>Obligatorio</p>
              )}
              {errors.email?.type === "pattern" && (
                <div className={style.error}>
                  <p>Ingresa un correo válido</p>
                  <i class="fa-solid fa-circle-exclamation"></i>
                </div>
              )}
            </div>
            <div className={style.container_input}>
              <input
                required
                className={style.input}
                // placeholder="Contraseña"
                type="password"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                })}
              ></input>
              <span></span>
              <label className={style.labelText}>Contraseña</label>
              {errors.password?.type === "required" && (
                <p className={style.error}>Obligatorio</p>
              )}
              {errors.password?.type === "pattern" && (
                <div className={style.error}>
                  <p>Mínimo 8 caracteres, (letras y números)</p>
                  <i class="fa-solid fa-circle-exclamation"></i>
                </div>
              )}
            </div>
            <div className={style.container_input}>
              <input
                required
                className={style.input}
                // placeholder="Nombre Completo"
                type="text"
                {...register("fullName", {
                  required: true,
                  maxLength: 20,
                })}
              ></input>
              <span></span>
              <label className={style.labelText}>Nombre completo</label>
              {errors.fullName?.type === "required" && (
                <p className={style.error}>Obligatorio</p>
              )}
            </div>
            {/* <div className={style.inputContainer}>
          <input
            className={style.input}
            placeholder="Provincia"
            type="text"
            {...register("province", {
              required: true,
            })}
          ></input>
          {errors.province?.type === "required" && (
            <p className={style.error}>Obligatorio</p>
          )}
        </div> */}
            {/* <div className={style.inputContainer}>
          <input
            className={style.input}
            placeholder="Ciudad"
            type="text"
            {...register("city", {
              required: true,
            })}
          ></input>
          {errors.city?.type === "required" && (
            <p className={style.error}>Obligatorio</p>
          )}
        </div> */}
            {/* <div className={style.inputContainer}>
          <input
            className={style.input}
            placeholder="Codigo Postal"
            type="text"
            {...register("zipCode", {
              required: true,
              maxLength: 5,
              pattern: /^[0-9]*$/,
            })}
          ></input>
          {errors.zipCode?.type === "required" && (
            <p className={style.error}>Obligatorio</p>
          )}
          {errors.zipCode?.type === "pattern" && (
            <p className={style.error}>Solo numeros</p>
          )}
          {errors.zipCode?.type === "maxLength" && (
            <p className={style.error}>Maximo 5 numeros</p>
          )}
        </div> */}
            {/* <div className={style.inputContainer}>
          <input
            className={style.input}
            placeholder="Direccion"
            type="text"
            {...register("address", {
              required: true,
              minLength: 5,
            })}
          ></input>
          {errors.address?.type === "required" && (
            <p className={style.error}>Obligatorio</p>
          )}
        </div> */}
            {/* <div className={style.register}> */}
            <button className={style.button_form}>Crear cuenta</button>
            <div className={style.google} onClick={handleSignInGoogle}>
              Registrarse con Google
            </div>
            <Link to="/login">
              <p className={style.link}>¿Ya tienes una cuenta? Inicia sesión</p>
            </Link>
            {/* </div> */}
          </form>
        </div>
      ) : (
        <img className={style.loader} src={Loader} alt="Loader" />
      )}
    </div>
  );
}
