import { sessionGoogle, singUp } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import style from "./Register.module.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserCart, postCart } from "../../redux/actions";
import Loader from "../Home/GIF_aparecer_BooksNook.gif"

export default function Register() {
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user, lastRoute } = useSelector(state => state)
  const dispatch = useDispatch()
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
      dispatch(postCart({ userId: user.uid, bookId: [false], suma: true }))
      if (uniqueIdArrayCart.length) {
        Swal.fire({
          title: 'Tienes productos en tu carrito de invitado',
          width: 650,
          text: "¿Quieres pasar estos productos a tu carrito de usuario?",
          icon: 'warning',
          iconColor: "#355070",
          showCancelButton: true,
          background: "#19191a",
          color: "#e1e1e1",
          confirmButtonColor: '#355070',
          cancelButtonColor: '#B270A2',
          confirmButtonText: '¡Si! Guardar carrito',
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(
              postCart({ userId: user.uid, bookId: uniqueIdArrayCart, suma: true })
            );
            setLoader(true);
            setTimeout(function () {
              dispatch(getUserCart(user.uid));
              localStorage.clear();
            }, 1998);
            setTimeout(() => {
              setLoader(false);
            }, 1999);
            setTimeout(() => {
              history.goBack();
            }, 2000);
          } else {
            history.goBack();
          }
        })
      } else {
        history.goBack();
      }
    }
  }, [user])
  //----------------------- Comienzo Funcion de Admin de ingresar --------------------------------//

  const handleAdmin = ()=> {
    Swal.fire({
      title: 'Ingrese el PIN ',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Look up',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return fetch(`//api.github.com/users/${login}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `${result.value.login}'s avatar`,
          imageUrl: result.value.avatar_url
        })
      }
    })
  }
  // --------------------------END Funcion de Admin de ingresar -------------------//

  //---------------- END Pasar carrito de invitado a base de datos de usuario cuando inicia sesión ---------------

  //---------------- END Pasar carrito de invitado a base de datos de usuario cuando inicia sesión ---------------

  const onSubmit = async (data) => {
    try {
      await singUp(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInGoogle = async () => {
    try {
      await sessionGoogle();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.login_body}>
      {!loader
        ?
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
                  <p >Mínimo 8 caracteres, (letras y números)</p>
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
            Registrarse con google
          </div>
          <Link to="/login">
            <p className={style.link}>¿Ya tienes una cuenta? Inicia sesión</p>
          </Link>
          <div className={style.link} onClick={handleAdmin}>
            ¿Eres administrador?
            
          </div>
          {/* </div> */}
        </form>
      </div>         
        : <img className={style.loader} src={Loader} alt="Loader" />}
    </div>
  );
}

