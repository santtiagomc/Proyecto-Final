import React, { useEffect, useState } from "react";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Home/GIF_aparecer_BooksNook.gif";

import {
  getDetail,
  GET_DETAIL,
  putStatus,
  postCart,
  getGuestCart,
  putBook,
  TABLE_VIEW,
} from "../../redux/actions";

import Review from "../../components/Review/Review.jsx";

import style from "./DetailPrueba.module.css";
import Swal from "sweetalert2";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Detail() {
  const dispatch = useDispatch();
  const myBook = useSelector((state) => state.detail);
  const { user, cart, deleteReview, putStatusBook, userDb } = useSelector(
    (state) => state
  );
  let [buttonDisabled, setButtonDisabled] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    console.log(userDb);
    dispatch(getDetail(id));
    return () => {
      dispatch({ type: GET_DETAIL, payload: [] });
    };
  }, [dispatch, user, deleteReview, putStatusBook, id]);

  useEffect(() => {
    dispatch(putBook(id, { visits: 1 }));
  }, [dispatch, id]);

  //----------------- Function averageRating + sweetAlert + Const -----------------

  let avarageRating =
    myBook.Reviews &&
    Math.round(
      myBook.Reviews.map((el) => {
        return el.rating;
      }).reduce((a, b) => a + b, 0) /
        myBook.Reviews.map((el) => {
          return el.rating;
        }).length
    );

  function swalAlert(timer, icon, message) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: icon,
      title: message,
    });
  }

  let repeatedIdArrayCart = [];
  let uniqueIdArrayCart = [];
  let quantity = {};
  if (localStorage.length && localStorage.cart) {
    repeatedIdArrayCart = localStorage.getItem("cart").split(",");
    uniqueIdArrayCart = [...new Set(repeatedIdArrayCart)];
    repeatedIdArrayCart.length &&
      repeatedIdArrayCart.forEach((el) => {
        quantity[el] = (quantity[el] || 0) + 1;
      });
  }

  let quantityUser;
  if (user && user.uid && cart.length && !cart.messageError) {
    quantityUser = cart.find((b) => b.id === id);
    quantityUser = quantityUser && quantityUser.quantity;
  }

  //----------------- END Function averageRating + sweetAlert + Const -----------------

  //----------------- Function click edit book -----------------

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(putStatus(myBook.id));
  };

  //----------------- END Function click edit book -----------------

  //----------------- Function click add to cart -----------------

  const handleCart = (e) => {
    e.preventDefault();

    if (user) {
      let quantityObject = Array.isArray(cart) && cart.find((b) => b.id === id);
      if (quantityObject) {
        if (quantityObject.quantity < 5 || !Array.isArray(cart)) {
          dispatch(
            postCart({ userId: user.uid, bookId: e.target.value, suma: true })
          );

          swalAlert(2000, "success", "Producto agregado al carrito");
        } else {
          swalAlert(2000, "error", "Alcanzaste el máximo de este producto");
        }
      } else {
        dispatch(
          postCart({ userId: user.uid, bookId: e.target.value, suma: true })
        );

        swalAlert(2000, "success", "Producto agregado al carrito");
      }
    } else {
      const cartLS = localStorage.getItem("cart");

      if (cartLS) {
        if (uniqueIdArrayCart.includes(id)) {
          if (quantity[id] < 5) {
            localStorage.setItem("cart", `${cartLS},${id}`);

            swalAlert(2000, "success", "Producto agregado al carrito");
          } else {
            swalAlert(
              2000,
              "error",
              "Has alcanzado el límite de este producto"
            );
          }
        } else if (uniqueIdArrayCart.length < 10) {
          localStorage.setItem("cart", `${cartLS},${id}`);

          swalAlert(2000, "success", "Producto agregado al carrito");
        } else {
          swalAlert(
            2000,
            "error",
            "Has alcanzado el límite de productos distintos"
          );
        }
      } else {
        localStorage.setItem("cart", id);

        swalAlert(2000, "success", "Producto agregado al carrito");
      }

      repeatedIdArrayCart = localStorage.getItem("cart").split(",");
      uniqueIdArrayCart = [...new Set(repeatedIdArrayCart)];
      dispatch(getGuestCart(uniqueIdArrayCart.toString()));
    }
    setButtonDisabled(true);

    setTimeout(function () {
      setButtonDisabled(false);
    }, 1000);
  };

  //----------------- END Function click add to cart -----------------

  return (
    <>
      <div className={style.commandsContainer}>
        <div className={style.volverContainer}>
          <button className={style.btnBack} onClick={() => history.push("/")}>
            <AiOutlineArrowLeft className={style.btnArr} />
          </button>
        </div>
        {user &&
          userDb &&
          (userDb.role === "Admin++" || userDb.role === "Admin") && (
            <div className={style.adminContainer}>
              <button
                className={myBook.visible ? style.btnStatusF : style.btnStatusT}
                onClick={(e) => handleClick(e)}
              >
                {myBook.visible ? (
                  <div>
                    Ocultar producto <i class="fa-solid fa-eye-slash"></i>
                  </div>
                ) : (
                  <div>
                    Mostrar producto <i class="fa-solid fa-eye"></i>
                  </div>
                )}
              </button>
              <button
                className={style.btnStatusT}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: TABLE_VIEW, payload: "addBook" });
                  history.push(`/admin?id=${myBook.id}`);
                }}
              >
                Editar producto <i class="fa-solid fa-pencil"></i>
              </button>
            </div>
          )}
      </div>
      {myBook.name ? (
        <div className={style.detailInfo}>
          {myBook.visible ? null : (
            <h2 className={style.h2alert}>Producto no disponible</h2>
          )}
          <div className={style.container}>
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
              <h3 className={style.edition}>{myBook.edition}</h3>
              <div
                className={style.stars}
                hidden={!avarageRating ? true : false}
              >
                <div className={style.star}>
                  <i
                    className={
                      avarageRating >= 1
                        ? `fa-solid fa-star`
                        : `fa-regular fa-star`
                    }
                  ></i>
                </div>

                <div className={style.star}>
                  <i
                    className={
                      avarageRating >= 2
                        ? `fa-solid fa-star`
                        : `fa-regular fa-star`
                    }
                  ></i>
                </div>

                <div className={style.star}>
                  <i
                    className={
                      avarageRating >= 3
                        ? `fa-solid fa-star`
                        : `fa-regular fa-star`
                    }
                  ></i>
                </div>

                <div className={style.star}>
                  <i
                    className={
                      avarageRating >= 4
                        ? `fa-solid fa-star`
                        : `fa-regular fa-star`
                    }
                  ></i>
                </div>

                <div className={style.star}>
                  <i
                    className={
                      avarageRating >= 5
                        ? `fa-solid fa-star`
                        : `fa-regular fa-star`
                    }
                  ></i>
                </div>
              </div>
              <div>
                {myBook.Genres?.map((genre) => (
                  <span className={style.genre} key={genre.name}>
                    {genre.name}
                  </span>
                ))}
              </div>
              <h3 className={style.editorial}>{myBook.editorial}</h3>
              {myBook.stock > 0 && myBook.visible ? (
                <span className={style.disponible}>Disponible</span>
              ) : (
                <span className={style.noDisponible}>No disponible</span>
              )}
              <p className={style.description}>{myBook.description}</p>

              {user ? (
                userDb &&
                (userDb.role === "Admin++" || userDb.role === "Admin") ? (
                  <h3 className={style.price}>USD {myBook.price}</h3>
                ) : (
                  userDb.role === "Usuario" && (
                    <div className={style.containerBuy}>
                      <h3 className={style.price}>USD {myBook.price}</h3>
                      <button
                        className={
                          myBook.visible && !buttonDisabled
                            ? style.cart
                            : `${style.cart} ${style.cartF} `
                        }
                        disabled={
                          myBook.visible && !buttonDisabled ? false : true
                        }
                        value={id}
                        type="button"
                        onClick={(e) => handleCart(e)}
                      >
                        Agregar al carrito{" "}
                        {!user ? (
                          quantity && quantity[id] ? (
                            <div className={style.number}>{quantity[id]}</div>
                          ) : (
                            <div className={style.number}>0</div>
                          )
                        ) : quantityUser ? (
                          <div className={style.number}>{quantityUser}</div>
                        ) : (
                          <div className={style.number}>0</div>
                        )}
                      </button>
                    </div>
                  )
                )
              ) : (
                <div className={style.containerBuy}>
                  <h3 className={style.price}>USD {myBook.price}</h3>
                  <button
                    className={
                      myBook.visible && !buttonDisabled
                        ? style.cart
                        : `${style.cart} ${style.cartF} `
                    }
                    disabled={myBook.visible && !buttonDisabled ? false : true}
                    value={id}
                    type="button"
                    onClick={(e) => handleCart(e)}
                  >
                    Agregar al carrito{" "}
                    {!user ? (
                      quantity && quantity[id] ? (
                        <div className={style.number}>{quantity[id]}</div>
                      ) : (
                        <div className={style.number}>0</div>
                      )
                    ) : quantityUser ? (
                      <div className={style.number}>{quantityUser}</div>
                    ) : (
                      <div className={style.number}>0</div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
          <Review id={id} />
        </div>
      ) : (
        <div className={style.loaderContainer}>
          <img src={Loader} alt="Logo loader" className={style.loader} />
        </div>
      )}
    </>
  );
}