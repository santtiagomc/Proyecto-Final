import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import style from "./Cart.module.css";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const cartLS = localStorage.getItem("cart");

  useEffect(() => {
    // ? action que trae los libros que le pasamos por argumento
    /* let arrayfiltrado = mislibros.map((libro) => {
      for (let i = 0; i < misIDs.length; i++) {
        let buscado;
        if (misIDs[i] === libro.id) {
          buscado.push(libro);
          return buscado;
        }
      }
    }); */
  }, [cart]);

  return (
    <>
      <h1 className={style.h1}>Carrito WIP</h1>
      {cartLS &&
        cartLS.split(",").map((el, index) => {
          return (
            <div key={index}>
              <Link to={`/detail/${el}`}>
                <h1>{el}</h1>
              </Link>
            </div>
          );
        })}
    </>
  );
}
