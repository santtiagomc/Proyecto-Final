import { sessionGoogle, singUp } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import style from "./Register.module.css";

export default function Register() {
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await singUp(data);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignInGoogle = async () => {
    try {
      await sessionGoogle();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={style.container}>
        <h2 className={style.title}>Crear cuenta</h2>
        <div className={style.inputContainer}>
          <input
            className={style.input}
            placeholder="Email"
            type="text"
            {...register("email", {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            })}
          ></input>
          {errors.email?.type === "required" && (
            <p className={style.error}>Obligatorio</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className={style.error}>Ingresa un email valido</p>
          )}
        </div>
        <div className={style.inputContainer}>
          <input
            className={style.input}
            placeholder="Contrasena"
            type="password"
            {...register("password", {
              required: true,
              pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            })}
          ></input>
          {errors.password?.type === "required" && (
            <p className={style.error}>Obligatorio</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className={style.error}>
              Minimo 8 caracteres, al menos una letra y un numero
            </p>
          )}
        </div>
        <div className={style.inputContainer}>
          <input
            className={style.input}
            placeholder="Nombre Completo"
            type="text"
            {...register("fullName", {
              required: true,
              maxLength: 20,
            })}
          ></input>
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
        <div className={style.register}>
          <button className={style.registerButton}>Crear</button>
          <span onClick={handleSignInGoogle}>Con google</span>
        </div>
      </form>
    </>
  );
}
