import { useEffect, useState } from "react";
import { sessionGoogle, singIn } from "../../firebase/auth";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import style from "./Login.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postCart } from "../../redux/actions";
import Swal from "sweetalert2";

export default function Login() {
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch()
  const { user } = useSelector(state => state)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (user && user.uid) {
      dispatch(postCart({ userId: user.uid, bookId: [false], suma: true }))
    }
  }, [user])

  const handleGoogle = async () => {
    try {
      await sessionGoogle();
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: `Has iniciado sesión con la cuenta: ${user.email}`,
      });
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (user) => {
    try {
      const userLog = await singIn(user.email, user.password);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: `Has iniciado sesión con la cuenta: ${user.email}`,
      });
      setTimeout(() => {
        history.push("/");
      }, 1000);
    } catch (error) {
      setError("Usuario o contrasena incorrecto");
      console.log(error);
    }
  };

  return (
    <div>
      <div className={style.container}>
        <h2 className={style.login}>Ingresar</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <hr></hr>
          <div className={style.container_input}>
            <input
              className={style.inputLogin}
              type="text"
              {...register("email", {
                required: true,
              })}
            ></input>
            <label className={style.labelText}>Correo</label>
            {errors.email?.type === "required" && (
              <p className={style.error}>Obligatorio</p>
            )}
          </div>
          <div className={style.container_input}>
            <input
              className={style.inputLogin}
              type="password"
              {...register("password", {
                required: true,
              })}
            ></input>
            <label className={style.labelText}>Contraseña</label>
            {errors.password?.type === "required" && (
              <p className={style.error}>Obligatorio</p>
            )}
          </div>
          <button>Iniciar sesión</button>
          {error && <p className={style.ver}>{error}</p>}
          <p className={style.labelText} onClick={handleGoogle}>
            Iniciar sesión con google
          </p>
          <Link to="register">
            <p className={style.ver}>¿No tienes una cuenta? Registrate</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
