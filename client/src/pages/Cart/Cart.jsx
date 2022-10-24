import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "./Cart.module.css";
import { getGuestCart, postCart } from "../../redux/actions";
import Swal from "sweetalert2";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart, user } = useSelector((state) => state);

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

  let [buttonDisabled, setButtonDisabled] = useState(false);

  const handleCartAdd = (e) => {
    e.preventDefault();
    if (user) {
      let { quantity } = cart.find((b) => b.id === e.target.value);
      if (quantity < 5) {
        dispatch(
          postCart({ userId: user.uid, bookId: e.target.value, suma: true })
        );

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: "Has modificado la cantidad del producto",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "error",
          title: "Alcanzaste el máximo de este producto",
        });
      }
    } else {
      if (quantity[e.target.value] < 5) {
        localStorage.setItem(
          "cart",
          `${repeatedIdArrayCart.toString()},${e.target.value}`
        );

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: "Has modificado la cantidad del producto",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "error",
          title: "Alcanzaste el máximo de este producto",
        });
      }
      dispatch(getGuestCart(uniqueIdArrayCart.toString()));
    }
    setButtonDisabled(true);

    setTimeout(function () {
      setButtonDisabled(false);
    }, 1000);
  };

  const handleCartSubs = (e) => {
    e.preventDefault();
    if (user) {
      let { quantity } = cart.find((b) => b.id === e.target.value);
      if (quantity > 1) {
        dispatch(
          postCart({ userId: user.uid, bookId: e.target.value, suma: false })
        );

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: "Has modificado la cantidad del producto",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "error",
          title: "Alcanzaste el máximo de este producto",
        });
      }
    } else {
      if (quantity[e.target.value] > 1) {
        let index = repeatedIdArrayCart.indexOf(e.target.value);
        let filtered = repeatedIdArrayCart.splice(index, 1);

        localStorage.setItem("cart", `${repeatedIdArrayCart.toString()}`);

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "success",
          title: "Has modificado la cantidad del producto",
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: "error",
          title: "Alcanzaste el mínimo de este producto",
        });
      }
      dispatch(getGuestCart(uniqueIdArrayCart.toString()));
    }
    setButtonDisabled(true);

    setTimeout(function () {
      setButtonDisabled(false);
    }, 1000);
  };

  return (
    <>
      {!user ? (
        cart.length ? (
          <div className={style.cart_container}>
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
              <div key={book.id}>
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
                </div>
                <hr></hr>
              </div>
            ))}
          </div>
        ) : !uniqueIdArrayCart.length ? (
          <h1 className={style.message}>
            ¡Oh! Tu carrito está vacío. ¿No sabes qué libro leer? ¡Tenemos
            muchos que te van a encantar!
          </h1>
        ) : (
          <h1 className={style.message}>Cargando...</h1>
        )
      ) : Object.keys(cart) || cart.length ? (
        cart.messageError ? (
          <h1 className={style.message}>{cart.messageError}</h1>
        ) : (
          <div className={style.cart_container}>
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
                      </div>
                    </div>
                    <h3 className={`col-2 text-center ${style.detail_price}`}>
                      {book.price}
                    </h3>
                    <div
                      className={`col-1 text-center ${style.detail_quantity}`}
                    >
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
                    </div>
                    <h3 className={`col-2 text-center ${style.detail_price}`}>
                      {(book.price * book.quantity).toFixed(2)}
                    </h3>
                  </div>
                  <hr></hr>
                </div>
              ))}
          </div>
        )
      ) : (
        <h1 className={style.message}>Cargando...</h1>
      )}
    </>
  );
}

//   return (
//     <>
//       <h1 className={style.h1}>Carrito WIP</h1>
//       {cartLS &&
//         filteredBooks.map((el, index) => {
//           return (
//             <div key={index}>
//               <Link to={`/detail/${el}`}>
//                 <h1>{`Producto: ${el} | Cantidad: ${counts[el]}`}</h1>
//               </Link>
//             </div>
//           );
//         })}
//     </>
//   );
// }
