import { useState } from "react";
import { sessionGoogle, singIn } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import style from "./Login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleGoogle = async () => {
    try {
      await sessionGoogle();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (user) => {
    try {
      const userLog = await singIn(user.email, user.password);
      history.push("/");
      console.log(userLog);
    } catch (error) {
      setError("Usuario o contrasena incorrecto");
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.container}>
      <h2 className={style.login}>Login</h2>
      <div className={style.containerInput}>
        <label className={style.labelText}>Correo</label>
        <input
          className={style.inputLogin}
          type="text"
          {...register("email", {
            required: true,
          })}
        ></input>
        {errors.email?.type === "required" && (
          <p className={style.error}>Obligatorio</p>
        )}
      </div>
      <div className={style.containerInput}>
        <label className={style.labelText}>Contrasena</label>
        <input
          className={style.inputLogin}
          type="password"
          {...register("password", {
            required: true,
          })}
        ></input>
        {errors.password?.type === "required" && (
          <p className={style.error}>Obligatorio</p>
        )}
      </div>
      <button>Log in</button>
      {error && <p className={style.ver}>{error}</p>}
      <span className={style.labelText} onClick={handleGoogle}>
        Con google
      </span>
      <Link to="register">
        <p className={style.ver}>No tienes una cuenta?</p>
      </Link>
    </form>
  );
}
