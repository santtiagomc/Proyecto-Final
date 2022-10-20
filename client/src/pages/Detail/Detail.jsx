import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getDetail,
  GET_DETAIL,
  putStatus,
  addToCart,
} from "../../redux/actions";

import Review from "../../components/Review/Review.jsx";
import style from "./DetailPrueba.module.css";

const cartLS = localStorage.getItem("cart")

export default function Detail() {
  const dispatch = useDispatch();
  const myBook = useSelector((state) => state.detail);
  const [cart, setCart] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch({ type: GET_DETAIL, payload: [] });
    };
  }, []);
  // intente usar el object.keys pero no funciono no se por que

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(putStatus(myBook.id));
  };
  const handleEdit = (e) => {
    e.preventDefault();
  };

  const handleCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(myBook.id));
    localStorage.setItem("cart", [myBook.id])
  };
  console.log(cartLS)
  let contador;

  return (
    <>
      <div className={style.adminContainer}>
        <button
          className={myBook.visible ? style.btnStatusF : style.btnStatusT}
          onClick={(e) => handleClick(e)}
        >
          {myBook.visible ? "Ocultar producto" : "Mostrar producto"}
        </button>
        <NavLink to={`/edit/${id}`}>
          <button className={style.btnStatusT}>Editar producto</button>
        </NavLink>
      </div>
      {myBook.name ? (
        <div>
          {myBook.visible ? null : (
            <h2 className={style.h2alert}>Producto no disponible</h2>
          )}
          <div className={myBook.visible ? style.containerT : style.containerF}>
            <div>
              <img
                className={style.image}
                src={myBook.image}
                alt={`Portada del libro ${myBook.name}`}
              />
            </div>
            <div className={style.info}>
              <h2 className={style.name}>{myBook.name}</h2>
              <h3 className={style.author}>{myBook.author}</h3>
              <span className={style.rating}>
                &#9733; &#9733; &#9733; &#9733;
              </span>
              <h3 className={style.edition}>{myBook.edition}</h3>
              {myBook.Genres?.map((genre) => (
                <span className={style.genre} key={genre.name}>
                  {genre.name}
                </span>
              ))}
              <h3 className={style.editorial}>{myBook.editorial}</h3>
              {myBook.stock > 0 ? (
                <span className={style.disponible}>Disponible</span>
              ) : (
                <span className={style.noDisponible}>No disponible</span>
              )}
              <p className={style.description}>{myBook.description}</p>
              <div className={style.containerBuy}>
                <h3 className={style.price}>USD {myBook.price}</h3>
                <button
                  className={myBook.visible ? style.cart : style.cartF}
                  disabled={myBook.visible ? false : true}
                  value="cart"
                  type="button"
                  onClick={(e) => handleCart(e)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
          <Review />
        </div>
      ) : (
        <div className={style.loaderContainer}>
          <span className={style.loader}></span>
        </div>
      )}
    </>
  );
}