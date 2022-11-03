import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Cart.module.css";
import {
  getGuestCart,
  getUserCart,
  postCart,
  putUserCart,
  deleteUserCart,
} from "../../redux/actions";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import Loader from "../Home/GIF_aparecer_BooksNook.gif";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart, user } = useSelector((state) => state);
  let [buttonDisabled, setButtonDisabled] = useState(false);

  //----------------- Function sweetAlert + Const -----------------

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

  //----------------- END Function sweetAlert + Const -----------------

  //----------------- Function add product -----------------

  const handleCartAdd = (e) => {
    e.preventDefault();
    if (user) {
      let { quantity, stock } = cart.find((b) => b.id === e.target.value);
      if (stock - quantity === 0) {
        swalAlert(2000, "error", "Alcanzaste el stock máximo de este producto");
      } else if (quantity < 5) {
        dispatch(
          postCart({ userId: user.uid, bookId: e.target.value, suma: true })
        );

        swalAlert(2000, "success", "Has modificado la cantidad del producto");
      } else {
        swalAlert(2000, "error", "Alcanzaste el máximo de este producto");
      }
    } else {
      let { stock } = cart.find((b) => b.id === e.target.value);
      if (stock - quantity[e.target.value] === 0) {
        swalAlert(2000, "error", "Alcanzaste el stock máximo de este producto");
      } else if (quantity[e.target.value] < 5) {
        localStorage.setItem(
          "cart",
          `${repeatedIdArrayCart.toString()},${e.target.value}`
        );

        swalAlert(2000, "success", "Has modificado la cantidad del producto");
      } else {
        swalAlert(2000, "error", "Alcanzaste el máximo de este producto");
      }
      dispatch(getGuestCart(uniqueIdArrayCart.toString()));
    }
    setButtonDisabled(true);

    setTimeout(function () {
      setButtonDisabled(false);
    }, 1000);
  };

  //----------------- END Function add product -----------------

  //----------------- Function subs product -----------------

  const handleCartSubs = (e) => {
    e.preventDefault();
    if (user) {
      let { quantity } = cart.find((b) => b.id === e.target.value);
      if (quantity > 1) {
        dispatch(
          postCart({ userId: user.uid, bookId: e.target.value, suma: false })
        );

        swalAlert(2000, "success", "Has modificado la cantidad del producto");
      } else {
        swalAlert(2000, "error", "Alcanzaste el mínimo de este producto");
      }
    } else {
      if (quantity[e.target.value] > 1) {
        let index = repeatedIdArrayCart.indexOf(e.target.value);
        repeatedIdArrayCart.splice(index, 1);

        localStorage.setItem("cart", `${repeatedIdArrayCart.toString()}`);

        swalAlert(2000, "success", "Has modificado la cantidad del producto");
      } else {
        swalAlert(2000, "error", "Alcanzaste el mínimo de este producto");
      }
      dispatch(getGuestCart(uniqueIdArrayCart.toString()));
    }
    setButtonDisabled(true);

    setTimeout(function () {
      setButtonDisabled(false);
    }, 1000);
  };

  //----------------- END Function subs product -----------------

  //----------------- Function remove book ----------------------

  const handleRemoveBook = (bookId) => {
    //e.preventDefault();
    let bookName = cart.find((b) => b.id === bookId);
    Swal.fire({
      title: `¿Seguro quieres eliminar '${bookName.name}' de tu carrito?`,
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      width: 650,
      background: "#19191a",
      color: "#e1e1e1",
      showCancelButton: true,
      confirmButtonColor: "#355070",
      cancelButtonColor: "#B270A2",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (user) {
          dispatch(putUserCart(cart[0].cartId, bookId));

          swalAlert(
            2000,
            "success",
            `Se eliminó '${bookName.name}' de tu carrito`
          );

          setTimeout(function () {
            dispatch(getUserCart(user.uid));
          }, 2000);
        } else {
          let filterLocalStorage = repeatedIdArrayCart.filter(
            (id) => id !== bookId
          );
          localStorage.setItem("cart", `${filterLocalStorage.toString()}`);

          swalAlert(
            2000,
            "success",
            `Se eliminó '${bookName.name}' de tu carrito`
          );

          setTimeout(function () {
            dispatch(getGuestCart(filterLocalStorage.toString()));
          }, 2000);
        }
      }
    });
  };

  //----------------- END Function remove book ----------------------

  //----------------- Function remove cart --------------------------

  const handleRemoveCart = () => {
    Swal.fire({
      title: "¿Seguro quieres eliminar tu carrito?",
      text: "Se borrarán todos los libros añadidos",
      icon: "warning",
      width: 650,
      background: "#19191a",
      color: "#e1e1e1",
      showCancelButton: true,
      confirmButtonColor: "#355070",
      cancelButtonColor: "#B270A2",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (user && user.uid) {
          setTimeout(function () {
            dispatch(deleteUserCart(cart[0].cartId));
          }, 300);
          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu carrito se encuentra vacío",
            icon: "success",
            width: 650,
            background: "#19191a",
            color: "#e1e1e1",
            timer: 2000,
          });

          setTimeout(function () {
            dispatch(getUserCart(user.uid));
          }, 700);
        } else {
          localStorage.clear();

          Swal.fire({
            title: "¡Eliminado!",
            text: "Tu carrito se encuentra vacío",
            icon: "success",
            width: 650,
            background: "#19191a",
            color: "#e1e1e1",
          });

          setTimeout(function () {
            dispatch(getGuestCart());
          }, 700);
        }
      }
    });
  };

  //----------------- END Function remove cart --------------------------

  //----------------- Function control de stock -------------------------

  function handleStock(e) {
    e.preventDefault();
    let booksStock = [];
    if (user && user.uid) {
      cart.forEach((b) => {
        if (b.stock - b.quantity < 0) {
          booksStock.push(b.name);
        }
      });
      if (booksStock.length) {
        Swal.fire({
          title: "Superaste el stock disponible en alguno de los productos",
          text: "Revisa tu carrito y vuelve a intentar",
          icon: "warning",
          width: 650,
          background: "#19191a",
          color: "#e1e1e1",
          confirmButtonColor: "#355070",
          cancelButtonColor: "#B270A2",
          confirmButtonText: "Aceptar",
        });
      } else {
        setTimeout(function () {
          history.push("/stripe");
        }, 500);
      }
    }
  }

  //----------------- END Function control de stock -------------------------

  return (
    <>
      {!user ? (
        cart.length ? (
          <div className={style.cart_container}>
            <button className={style.btnBack} onClick={() => history.goBack()}>
              <AiOutlineArrowLeft className={style.btnArr} />
            </button>
            <button onClick={handleRemoveCart} className={style.btnDelete}>
              Vaciar carrito
            </button>
            <div className={`${style.attributes}`}>
              <h4 className={`col-7 ps-4 ${style.attributes_h2}`}>Producto</h4>
              <h4 className={`col-2 text-center ${style.attributes_h2}`}>
                Precio unitario
              </h4>
              <h4 className={`col-1 text-center ${style.attributes_h2}`}>
                Cantidad
              </h4>
              <h4 className={`col-2 text-center ${style.attributes_h2}`}>
                Precio total
              </h4>
            </div>
            <hr></hr>

            {cart.map((book) => (
              <div key={book.id} className={style.detailContainer}>
                <div className={style.detail}>
                  <div className={`col-7 text-center ${style.detail_product}`}>
                    <img
                      src={book.image}
                      alt="Portada"
                      className={style.detail_img}
                    ></img>
                    <div className={style.detail_info}>
                      <Link to={`/detail/${book.id}`}>
                        <h2 className={style.detail_info_h2}>{book.name}</h2>
                      </Link>
                      <h5 className={style.detail_info_h4}>{book.author}</h5>
                    </div>
                  </div>
                  <h3 className={`col-2 text-center ${style.detail_price}`}>
                    {book.price}
                  </h3>
                  <div className={`col-1 text-center ${style.detail_quantity}`}>
                    <button
                      value={book.id}
                      onClick={handleCartSubs}
                      className={
                        buttonDisabled
                          ? `${style.detail_quantity_button} ${style.button_disabled}`
                          : style.detail_quantity_button
                      }
                      disabled={buttonDisabled}
                    >
                      -
                    </button>
                    <h3 className={style.detail_quantity_p}>
                      {quantity[book.id]}
                    </h3>
                    <button
                      value={book.id}
                      onClick={handleCartAdd}
                      className={
                        buttonDisabled
                          ? `${style.detail_quantity_button} ${style.button_disabled}`
                          : style.detail_quantity_button
                      }
                      disabled={buttonDisabled}
                    >
                      +
                    </button>
                  </div>
                  <h3 className={`col-2 text-center ${style.detail_price}`}>
                    {(book.price * quantity[book.id]).toFixed(2)}
                  </h3>
                  <button
                    onClick={() => handleRemoveBook(book.id)}
                    className={style.btnTrash}
                  >
                    <FaRegTrashAlt />
                    {/* <i class="fa-regular fa-trash-can"></i> */}
                  </button>
                </div>
                <hr></hr>
              </div>
            ))}
            <Link to="/login">
              <button className={style.botonComprar}>Comprar</button>
            </Link>
          </div>
        ) : !uniqueIdArrayCart.length ? (
          <div>
            <button
              onClick={() => history.goBack()}
              className={style.btnBackEmptyCart}
            >
              <AiOutlineArrowLeft className={style.btnArr} />
            </button>
            <h1 className={style.message}>
              ¡Oh! Tu carrito está vacío. ¿No sabes qué libro leer? Te sugerimos
              nuestra sección de <br />
              <a href="/#popular">recomendados.</a>
            </h1>
          </div>
        ) : (
          <img src={Loader} alt="Logo loader" className={style.loader} />
        )
      ) : Object.keys(cart) || cart.length ? (
        cart.messageError ? (
          <div>
            <button
              onClick={() => history.goBack()}
              className={style.btnBackEmptyCart}
            >
              <AiOutlineArrowLeft className={style.btnArr} />
            </button>
            <h1 className={style.message}>
              ¡Oh! Tu carrito está vacío. ¿No sabes qué libro leer? Te sugerimos
              nuestra sección de <br />
              <a href="/#popular">recomendados.</a>
            </h1>
          </div>
        ) : (
          <div className={style.cart_container}>
            <button className={style.btnBack} onClick={() => history.goBack()}>
              <AiOutlineArrowLeft className={style.btnArr} />
            </button>
            <button onClick={handleRemoveCart} className={style.btnDelete}>
              Vaciar carrito
            </button>
            <div className={`${style.attributes}`}>
              <h4 className={`col-7 ps-4 ${style.attributes_h2}`}>Producto</h4>
              <h4 className={`col-2 text-center ${style.attributes_h2}`}>
                Precio unitario
              </h4>
              <h4 className={`col-1 text-center ${style.attributes_h2}`}>
                Cantidad
              </h4>
              <h4 className={`col-2 text-center ${style.attributes_h2}`}>
                Precio total
              </h4>
            </div>
            <hr></hr>
            {cart &&
              cart.length &&
              cart.map((book) => (
                <div key={book.id}>
                  <div className={style.detail}>
                    <div
                      className={`col-7 text-center ${style.detail_product}`}
                    >
                      <img
                        src={book.image}
                        alt="Portada"
                        className={style.detail_img}
                      ></img>
                      <div className={style.detail_info}>
                        <Link to={`/detail/${book.id}`}>
                          <h2 className={style.detail_info_h2}>{book.name}</h2>
                        </Link>
                        <h5 className={style.detail_info_h4}>{book.author}</h5>
                        {book.stock === 0 ? (
                          <span className={style.soldOutBook}>Agotado</span>
                        ) : book.stock === 1 ? (
                          <span className={style.lastBook}>
                            Último disponible
                          </span>
                        ) : (
                          <span className={style.availableBook}>
                            Stock disponible: {book.stock}
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className={`col-2 text-center ${style.detail_price}`}>
                      {book.price}
                    </h3>
                    <div
                      className={`col-1 text-center ${style.detail_quantity}`}
                    >
                      {book.stock - book.quantity < 0 ? (
                        <button
                          className={`${style.detail_quantity_button} ${style.button_disabled}`}
                        >
                          <button
                            className={`${style.detail_quantity_button} ${style.button_disabled}`}
                            disabled={true}
                          >
                            -
                          </button>
                          <h3 className={style.detail_quantity_p}>
                            {book.quantity}
                          </h3>
                          <button
                            className={`${style.detail_quantity_button} ${style.button_disabled}`}
                            disabled={true}
                          >
                            +
                          </button>
                        </button>
                      ) : (
                        <>
                          <button
                            value={book.id}
                            onClick={handleCartSubs}
                            className={
                              buttonDisabled
                                ? `${style.detail_quantity_button} ${style.button_disabled}`
                                : style.detail_quantity_button
                            }
                            disabled={buttonDisabled}
                          >
                            -
                          </button>
                          <h3 className={style.detail_quantity_p}>
                            {book.quantity}
                          </h3>
                          <button
                            value={book.id}
                            onClick={handleCartAdd}
                            className={
                              buttonDisabled
                                ? `${style.detail_quantity_button} ${style.button_disabled}`
                                : style.detail_quantity_button
                            }
                            disabled={buttonDisabled}
                          >
                            +
                          </button>
                        </>
                      )}
                    </div>
                    <h3 className={`col-2 text-center ${style.detail_price}`}>
                      {(book.price * book.quantity).toFixed(2)}
                    </h3>

                    <button
                      onClick={() => handleRemoveBook(book.id)}
                      className={style.btnTrash}
                    >
                      <FaRegTrashAlt />
                      {/* <i class="fa-regular fa-trash-can"></i> */}
                    </button>
                  </div>
                  <hr></hr>
                </div>
              ))}
            <Link to="/stripe">
              <button className={style.botonComprar} onClick={handleStock}>
                Comprar
              </button>
            </Link>
          </div>
        )
      ) : (
        <img src={Loader} alt="Logo loader" className={style.loader} />
      )}
    </>
  );
}
