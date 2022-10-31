import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, getCarts, putStatus, PUT_STATUS } from "../../redux/actions";
import { useHistory } from "react-router-dom"

import {
  AiFillEdit,
  ImBooks
} from "react-icons/all";
import Swal from "sweetalert2";
import templateAlert from "../../helpers/templateAlert";
import style from "./PanelOrders.module.css";

export default function PanelBooks() {
  const { allCarts } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(getCarts("Abierto"));
  }, []);

  console.log(allCarts[4])

  function templateAlertBooks(title, text) {
    console.log(text)
    return Swal.fire({
      background: "#19191a",
      color: "#181818",
      title: `<span class=${style.title}>Productos</span>`,
      html: Array.isArray(text) ? text.map(book => {
        return `
      <div>
        <span class=${style.price}>$${book.price}</span>
        <a href="/detail/${book.Books_Carts.BookId}" target="_BLANK">${book.name}</a>
        <span class=${style.quantity}>${book.Books_Carts.quantity}</span>
        <span class=${style.total}>$${book.Books_Carts.quantity * book.price}</span>
        <hr></hr>
      </div>
      `
      })
        : `<div>
          <span class=${style.text_empty}>${text}</span>
        </div>`,
      width: 650,
      customClass: {
        title: style.swal_title,
        htmlContainer: style.swal_books
      }
    });
  }

  return (
    <div className={style.container}>
      {/* <div className={style.stats_container}>
        <div className={style.stats_sub_container}>
          <div className={style.stats}>Crear libro</div>
          <div className={style.stats}>
            <h2>Libros unicos</h2>
          </div>
        </div>
        <div className={style.stats_sub_container}>
          <div className={style.stats}>Libros totales</div>
          <div className={style.stats}>tarjeta 4</div>
        </div>
      </div> */}
      <div className={style.table_container}>
        <div className={`${style.table_row} ${style.table_row_attributtes}`}>
          <span className={style.col0}>Id</span>
          <span className={style.col1}>Estado</span>
          <span className={style.col2}>Precio total</span>
          <span className={style.col3}>Usuario</span>
          <span className={style.col4}>Correo</span>
          <span className={style.col5}>Productos</span>
        </div>
        {allCarts.length &&
          allCarts.map(cart => (
            <div className={style.table_row} key={cart.id}>
              <span className={style.col0}>{cart.id}</span>
              <span className={style.col1}>
                <span className={style.text}>{cart.status}</span>
                <AiFillEdit className={style.icon} />
              </span>
              <span className={style.col2}>{cart.Books.length && "$ " + cart.Books.reduce((acc, el) => {
                acc += (el.Books_Carts.quantity * el.price)
                return Number(acc.toFixed(2))
              }, 0)}</span>
              <span className={style.col3}>{cart.User && cart.User.fullName}</span>
              <span className={style.col4}>{cart.User && cart.User.email}</span>
              <span className={style.col5} onClick={() =>
                templateAlertBooks(
                  "Productos",
                  cart.Books.length ? cart.Books : "No tienes ningún producto"
                )} >
                <span className={style.text}>Productos</span>
                <ImBooks className={style.icon} />
              </span>
            </div>
          ))}
        {/* {allBooks.length &&
          allBooks.map((el, index) => (
            <div className={style.table_row} key={index}>
              <span className={style.col0}>{index}</span>
              <span className={style.col1} onClick={(e) => goDetail(e, el.id, el.name)}>{el.name}</span>
              <span className={style.col2}>{el.author}</span>
              <span className={style.col3}>{el.edition}</span>
              <span className={style.col4}>
                {el.Genres.length > 1 ? (
                  <button
                    className={style.btn}
                    onClick={() =>
                      templateAlert(
                        "Categorías",
                        el.Genres.map((ele) => ele.name).join(", ")
                      )
                    }
                  >
                    <BiCategory />
                  </button>
                ) : (
                  el.Genres.map((ele) => ele.name)
                )}
              </span>
              <span className={style.col5}>
                <button
                  className={style.btn}
                  onClick={() => handleImage(el.image, el.name)}
                >
                  <BiImage />
                </button>
              </span>
              <span className={style.col6}>
                <button
                  className={style.btn}
                  onClick={() => templateAlert("Descripción", el.description)}
                >
                  <MdDescription />
                </button>
              </span>
              <span className={style.col7}>{el.editorial}</span>
              <span className={style.col8}>{el.price}</span>
              <span className={style.col9}>{el.stock}</span>
              <span className={style.col10}>
                <BsFillPencilFill />
              </span>
              <span
                className={style.col11}
                onClick={(e) => handleClick(e, el.id, el.name, el.visible)}
              >
                {el.visible ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
          ))} */}
      </div>
    </div >
  );
}
