import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getDetail,
  GET_DETAIL,
  putStatus,
  addToCart,
  postCart,
  getGuestCart,
} from "../../redux/actions";

import Review from "../../components/Review/Review.jsx";
import style from "./DetailPrueba.module.css";
import Swal from "sweetalert2";

export default function Detail() {
  const dispatch = useDispatch();
  const myBook = useSelector((state) => state.detail);
  const { user, cart } = useSelector((state) => state);

  const { id } = useParams();

  useEffect(() => {
    //console.log(cart);
    dispatch(getDetail(id));
    return () => {
      dispatch({ type: GET_DETAIL, payload: [] });
    };
  }, [user]);
  // EL USER NO SE TOCA -> (Mati, Gman)

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(putStatus(myBook.id));
  };

  const handleCart = (e) => {
    e.preventDefault();
    alert("Producto agregado al carrito!");

    if (user) {
      dispatch(postCart({ userId: user.uid, bookId: id }));
    } else {
      const cartLS = localStorage.getItem("cart");

      if (cartLS) {
        let aux = `${cartLS},${id}`;

        localStorage.setItem("cart", aux);
      } else {
        localStorage.setItem("cart", id);
      }

      if (localStorage) {
        let datos = localStorage.getItem("cart").split(",");
        console.log(datos);

        let uniqueArray = datos.filter(function (item, pos) {
          return datos.indexOf(item) == pos;
        });
        console.log(uniqueArray);

        uniqueArray.length <= 10
          ? dispatch(getGuestCart(uniqueArray.toString()))
          : alert("nao nao amigao");
      }
    }
  };

  // ? En el boton de iniciar sesión ya había un localStorage con libros, ponemos un
  /* 
  if(localStorage && user){

    localStorage.forEach(el=>{
      dispatch(postCart({id:user, book:el}))
    })
  }
  */

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
              {myBook.stock > 0 && myBook.visible ? (
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
          <Review id={id} />
        </div>
      ) : (
        <div className={style.loaderContainer}>
          <span className={style.loader}></span>
        </div>
      )}
    </>
  );
}
