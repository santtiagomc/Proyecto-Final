import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../helpers/useUser";
import axios from "axios";
import Error from "../../components/Error/Error";
import style from "./UserProfile.module.css";
import {
  FaUser,
  FaShoppingCart,
  FaUserEdit,
  ImArrowLeft,
} from "react-icons/all";
import { useHistory } from "react-router-dom";
import Loader from "../Home/GIF_aparecer_BooksNook.gif";
import { logOut } from "../../firebase/auth";
import Avatar from "./avatar.png";
import { Link } from "react-router-dom";

export default function ProfileUser() {
  const [hovered, setHovered] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [booksBuyed, setBooksBuyed] = useState({});
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState({ change: false, edited: false });
  const [user, load] = useUser();
  const [page, setPage] = useState(0);
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const getUser = async (userId) => {
      try {
        const res = await axios.get(`/user/${userId}`);
        setDataUser(res.data);
        const userHistory = await axios.get(`/cart/${userId}-0`);
        setBooksBuyed(userHistory.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (!load) getUser(user);
  }, [load, edit.edited, user]);

  const onSubmit = async (data) => {
    try {
      await axios.put("/user", {
        ...data,
        id: user,
      });
      setEdit({ ...edit, change: !edit.change, edited: !edit.edited });
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = async () => {
    console.log("a");
    console.log(booksBuyed.total);
    if (page + 5 < booksBuyed.total) {
      console.log("xd");
      setPage(page + 5);
      try {
        const userHistory = await axios.get(`/cart/${user}-${page + 5}`);
        console.log(userHistory);
        setBooksBuyed({
          ...booksBuyed,
          books: [...booksBuyed.books, ...userHistory.data.books],
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(booksBuyed);
  const handleLogOut = async () => {
    try {
      await logOut();
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  if (user === undefined && !loading) {
    return <Error error="No estas autenticado" />;
  }

  return (
    <div className={style.container}>
      <div
        className={
          !hidden ? style.navigation : `${style.navigation} ${style.active}`
        }
      >
        <ul>
          <li onClick={() => history.push("/")}>
            <ImArrowLeft className={style.i} />
            <span className={style.title}>Regresar</span>
          </li>
          <li className={hovered === 1 && style.hovered}>
            <FaUser className={style.i} />
            <span className={style.title}>Perfil</span>
          </li>
          <li className={hovered === 4 && style.hovered}>
            <FaUserEdit className={style.i} />
            <span
              className={style.title}
              onClick={() => setEdit({ ...edit, change: !edit.change })}
            >
              Editar perfil
            </span>
          </li>
          {/* <li className={hovered === 3 && style.hovered}>
						<FaShoppingCart className={style.i} />
						<span className={style.title}>Historial de compras</span>
					</li> */}
          <li className={hovered === 6 && style.hovered}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span onClick={handleLogOut} className={style.title}>
              Cerrar sesión
            </span>
          </li>
        </ul>
      </div>
      {loading ? (
        <img src={Loader} alt="Logo loader" className={style.loader} />
      ) : (
        <div>
          <div
            className={!hidden ? style.main : `${style.main} ${style.active}`}
          >
            <div className={style.topbar}>
              <div
                className={style.toggle}
                onClick={
                  hidden ? () => setHidden(false) : () => setHidden(true)
                }
              >
                <i className="fa-solid fa-bars"></i>
              </div>
              <div className={style.logo}></div>
            </div>

            <div>
              <div className={style.option}>
                {!edit.change ? (
                  <>
                    <div className={style.containerA}>
                      <img src={Avatar} className={style.avatar} alt="avatar" />
                      <span className={style.user}>{dataUser.fullName}</span>
                    </div>
                    <div className={style.containerP}>
                      {/* <label className={style.label}>Nombre: </label>
												<p className={style.p}>{dataUser.fullName}</p> */}
                      <label className={style.label}>E-mail</label>
                      <span className={style.span}>{dataUser.email}</span>
                      <hr />
                      <label className={style.label}>Provincia</label>
                      <span className={style.span}>{dataUser?.province}</span>
                      <hr />
                      <label className={style.label}>Ciudad</label>
                      <span className={style.span}>{dataUser?.city}</span>
                      <hr />
                      <label className={style.label}>Dirección</label>
                      <span className={style.span}>{dataUser?.address}</span>
                      <hr />
                      <label className={style.label}>Código Postal</label>
                      <span className={style.span}>{dataUser?.zipCode}</span>
                      <hr />
                    </div>
                  </>
                ) : (
                  <form
                    className={style.form}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <input
                      className={style.input}
                      type="text"
                      placeholder="Provincia"
                      {...register("province", {
                        maxLength: 40,
                        value: null,
                      })}
                    ></input>
                    {errors.province?.type === "maxLength" && (
                      <p className={style.error}>maximo 40</p>
                    )}
                    <input
                      className={style.input}
                      type="text"
                      placeholder="Ciudad"
                      {...register("city", {
                        maxLength: 40,
                        value: null,
                      })}
                    ></input>
                    {errors.city?.type === "maxLength" && (
                      <p className={style.error}>maximo 40</p>
                    )}
                    <input
                      className={style.input}
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
                      className={style.input}
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
                    <button className={style.button}>Confirmar</button>
                    <button
                      className={style.button}
                      onClick={() => setEdit({ ...edit, change: !edit.change })}
                    >
                      Cancelar
                    </button>
                  </form>
                )}
                <br></br>
              </div>
            </div>
            <div className={style.shopping}>
              <div className={style.containerC}>
                <h2 className={style.misCompras}>Mis compras</h2>
              </div>
              {booksBuyed.books &&
                booksBuyed.books.map((book) => (
                  <div>
                    <div className={style.statusDiv}>
                      <span className={style.status}>
                        Estado: {book.status}
                      </span>
                    </div>
                    <div>
                      <ul>
                        {book.Books.map((purchase) => (
                          <div className={style.books}>
                            <img
                              src={purchase.image}
                              className={style.portada}
                            />
                            <span className={style.name}>{purchase.name}</span>
                            <span className={style.price}>
                              USD{" "}
                              {purchase.price * purchase.Books_Carts.quantity}
                            </span>
                            <span className={style.quantity}>
                              Cantidad: {purchase.Books_Carts.quantity}
                            </span>
                            <Link
                              to={`/detail/${purchase.id}`}
                              className={style.detail}
                            >
                              Detalle
                            </Link>
                          </div>
                        ))}
                      </ul>
                    </div>
                    {/* <hr /> */}
                  </div>
                ))}
              <button
                onClick={nextPage}
                className={!page ? style.btnDisabled : style.btn}
              >
                Ver más
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
