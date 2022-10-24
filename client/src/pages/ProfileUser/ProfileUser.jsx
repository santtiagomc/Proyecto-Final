import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useUser } from "../../helpers/useUser";
import axios from "axios";
import Error from "../../components/Error/Error";

import style from "./ProfileUser.module.css";

export default function ProfileUser() {
  const [dataUser, setDataUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({ change: false, edited: false });
  const [user, load] = useUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const getUser = async (userId) => {
      try {
        console.log(userId);
        const res = await axios.get(`/user/${userId}`);
        setDataUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!load) getUser(user);
  }, [load, edit.edited]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const a = await axios.put("/user", {
        ...data,
        id: user,
      });
      setEdit({ ...edit, change: !edit.change, edited: !edit.edited });
    } catch (error) {
      console.log(error);
    }
  };

  if (user === undefined && !loading) {
    return <Error error="No estas autenticado" />;
  }

  return (
    <>
      {loading ? (
        <div className={style.loaderContainer}>
          <span className={style.loader}></span>
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.section}>
            <ul className={style.listSection}>
              <li>
                <svg
                  className={style.icon}
                  version="1.1"
                  viewBox="0 0 1024 1024"
                >
                  <title>user</title>
                  <path d="m730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084q-29.747 19.159-51.175 57.729t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z"></path>
                </svg>
                {/* icono de prueba */}
              </li>
              <li className={style.account}>Cuenta</li>
              <li className={style.account}>Historial de compra</li>
              <li className={style.account}>Editar Perfil</li>
              <li className={style.account}>Cambiar Contrasena</li>
            </ul>
          </div>
          <div className={style.option}>
            <h1 className={style.title}> Vista general de la Cuenta </h1>
            <h2>Perfil</h2>
            {!edit.change ? (
              <div>
                <h4>Nombre: {dataUser.fullName}</h4>
                <h4>Correo Electrónico: {dataUser.email} </h4>
                <h4>Provincia: {dataUser?.province}</h4>
                <h4>Ciudad: {dataUser?.city}</h4>
                <h4>Dirección: {dataUser?.address}</h4>
                <h4>Código Postal: {dataUser?.zipCode}</h4>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  type="text"
                  placeholder="Provincia"
                  {...register("province", {
                    maxLength: 15,
                    value: null,
                  })}
                ></input>
                {errors.province?.type === "maxLength" && (
                  <p className={style.error}>maximo 15</p>
                )}
                <input
                  type="text"
                  placeholder="Ciudad"
                  {...register("city", {
                    maxLength: 15,
                    value: null,
                  })}
                ></input>
                {errors.city?.type === "maxLength" && (
                  <p className={style.error}>maximo 15</p>
                )}
                <input
                  type="text"
                  placeholder="Dirección"
                  {...register("address", {
                    maxLength: 40,
                    value: null,
                  })}
                ></input>
                {errors.address?.type === "maxLength" && (
                  <p className={style.error}>maximo 40</p>
                )}
                <input
                  type="text"
                  placeholder="Código Postal"
                  {...register("zipCode", {
                    maxLength: 5,
                    value: null,
                    pattern: /^[0-9]*$/,
                  })}
                ></input>
                {errors.zipCode?.type === "maxLength" && (
                  <p className={style.error}>maximo 5</p>
                )}
                {errors.zipCode?.type === "pattern" && (
                  <p className={style.error}>Solo numeros</p>
                )}
                <button>Confirmar</button>
                <span
                  onClick={() => setEdit({ ...edit, change: !edit.change })}
                >
                  Cancelar
                </span>
              </form>
            )}
            <button
              className={`${edit.change && style.disable}`}
              onClick={() => setEdit({ ...edit, change: !edit.change })}
            >
              Editar perfil
            </button>
            <div>
              <h2>Historial de compras</h2>
              <h4>Compra 1</h4>
              <h4>Compra 2</h4>
              <h4>Compra 3</h4>
              <button>Ver todas 🛒</button>
            </div>
            <br></br>
            <Link to="/">
              <button>Volver</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
