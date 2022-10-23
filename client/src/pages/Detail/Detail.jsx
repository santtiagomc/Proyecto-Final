import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  getDetail,
  GET_DETAIL,
  putStatus,
  postCart,
  getGuestCart,
  getUserCart,
} from "../../redux/actions";

import Review from "../../components/Review/Review.jsx";

import style from "./DetailPrueba.module.css";
import Swal from "sweetalert2";

export default function Detail() {
  const dispatch = useDispatch();
  const myBook = useSelector((state) => state.detail);
  const { user, cart, postCartResponse } = useSelector((state) => state);

  let [buttonDisabled, setButtonDisabled] = useState(false)

  const { id } = useParams();

  useEffect(() => {
    if (user && user.uid) {
      dispatch(getUserCart(user.uid));
    }
    dispatch(getDetail(id));
    return () => {
      dispatch({ type: GET_DETAIL, payload: [] });
    };
  }, [user, postCartResponse]);
  // EL USER NO SE TOCA -> (Mati, Gman)

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(putStatus(myBook.id));
  };

  let repeatedIdArrayCart = [];
  let uniqueIdArrayCart = [];
  let quantity = {};

  if (localStorage.length) {
    repeatedIdArrayCart = localStorage.getItem("cart").split(",");
    uniqueIdArrayCart = [...new Set(repeatedIdArrayCart)];
    repeatedIdArrayCart.length &&
      repeatedIdArrayCart.forEach((el) => {
        quantity[el] = (quantity[el] || 0) + 1;
      });
  }



  const handleCart = (e) => {
    e.preventDefault();

    if (user) {
      let { quantity } = cart.find(b => b.id === id)
      if (quantity < 5) {
        dispatch(
          postCart({ userId: user.uid, bookId: e.target.value, suma: true })
        );
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "error",
          title: "Alcanzaste el máximo de este producto",
        });
      }
    } else {
      const cartLS = localStorage.getItem("cart");

      if (cartLS) {
        if (uniqueIdArrayCart.includes(id)) {
          if (quantity[id] < 5) {
            localStorage.setItem("cart", `${cartLS},${id}`);

            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "success",
              title: "Producto agregado al carrito",
            });
          } else {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });
            Toast.fire({
              icon: "error",
              title: "Has alcanzado el límite de este producto",
            });
          }
        } else if (uniqueIdArrayCart.length < 10) {
          localStorage.setItem("cart", `${cartLS},${id}`);

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Producto agregado al carrito",
          });
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "error",
            title: "Has alcanzado el límite de productos distintos",
          });
        }
      } else {
        localStorage.setItem("cart", id);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        Toast.fire({
          icon: "success",
          title: "Producto agregado al carrito",
        });
      }

      repeatedIdArrayCart = localStorage.getItem("cart").split(",");
      uniqueIdArrayCart = [...new Set(repeatedIdArrayCart)];
      dispatch(getGuestCart(uniqueIdArrayCart.toString()));
    }
    setButtonDisabled(true)

    setTimeout(function () {
      setButtonDisabled(false)
    }, 2000);
  };

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
                  className={myBook.visible && !buttonDisabled ? style.cart : `${style.cart} ${style.cartF} `}
                  disabled={myBook.visible && !buttonDisabled ? false : true}
                  value={id}
                  type="button"
                  onClick={(e) => handleCart(e)}
                >
                  Agregar al carrito --- {!user ? quantity && quantity[id] ? quantity[id] : 0 : ""}
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
