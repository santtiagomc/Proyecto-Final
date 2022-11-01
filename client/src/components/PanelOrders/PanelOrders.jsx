import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CARTS_ORDER_ADMIN, CARTS_SEARCH_ADMIN, getAllBooks, getCarts, putCartStatus, putStatus, PUT_CART_STATUS, PUT_STATUS } from "../../redux/actions";
import { useHistory } from "react-router-dom"

import {
  AiFillEdit,
  ImBooks,
  BsSortNumericDown,
  BsSortNumericUp,
  AiOutlineSortAscending,
  AiOutlineSortDescending
} from "react-icons/all";
import Swal from "sweetalert2";
import templateAlert from "../../helpers/templateAlert";
import { templateAlertTopEnd } from "../../helpers/templateAlert";
import style from "./PanelOrders.module.css";
import Loader from "../../pages/Home/GIF_aparecer_BooksNook.gif";

export default function PanelBooks() {
  const { allCarts, putCartResponse, cartsFiltersAdmin } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    dispatch(getCarts(cartsFiltersAdmin));
  }, [putCartResponse, cartsFiltersAdmin]);

  useEffect(() => {
    if (allCarts.messageError) {
      templateAlertTopEnd(2000, "error", allCarts.messageError);
      dispatch({ type: CARTS_SEARCH_ADMIN, payload: [] });
    }
  }, [allCarts]);

  useEffect(() => {
    if (!Array.isArray(putCartResponse)) {
      if (putCartResponse.messageError) {
        templateAlertTopEnd(2000, "error", putCartResponse.messageError);
      } else {
        templateAlertTopEnd(2000, "success", putCartResponse.message);
      }
      dispatch({ type: PUT_CART_STATUS, payload: [] });
    }
  }, [putCartResponse]);

  function templateAlertBooks(title, text) {
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
    <div className={style.panel_orders}>
      {!allCarts.length ? (
        <img src={Loader} alt="Loader_Logo"></img>
      ) : (
        <div className={style.container}>
          <div className={style.table_container}>
            <div className={`${style.table_row} ${style.table_row_attributtes}`}>
              <span className={style.col0}>Id</span>
              <span
                className={
                  cartsFiltersAdmin.sort.slice(0, 3) === "sta"
                    ? `${style.col1} ${style.col_active}`
                    : style.col1
                }
                onClick={() =>
                  dispatch({
                    type: CARTS_ORDER_ADMIN,
                    payload:
                      cartsFiltersAdmin.sort === "status-A-Z" ? "status-Z-A" : "status-A-Z",
                  })
                }>
                <span>Estado</span>
                {cartsFiltersAdmin.sort === "status-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}
              </span>
              <span className={
                cartsFiltersAdmin.sort.slice(0, 3) === "pri"
                  ? `${style.col2} ${style.col_active}`
                  : style.col2
              }
                onClick={() =>
                  dispatch({
                    type: CARTS_ORDER_ADMIN,
                    payload:
                      cartsFiltersAdmin.sort === "price-min-max" ? "price-max-min" : "price-min-max",
                  })
                }>
                <span>Precio total</span>
                {cartsFiltersAdmin.sort === "price-min-max" ? (
                  <BsSortNumericDown className={style.i_order} />
                ) : (
                  <BsSortNumericUp className={style.i_order} />
                )}</span>
              <span className={
                cartsFiltersAdmin.sort.slice(0, 3) === "nam"
                  ? `${style.col3} ${style.col_active}`
                  : style.col3
              }
                onClick={() =>
                  dispatch({
                    type: CARTS_ORDER_ADMIN,
                    payload:
                      cartsFiltersAdmin.sort === "name-A-Z" ? "name-Z-A" : "name-A-Z",
                  })
                }>
                <span>Usuario</span>
                {cartsFiltersAdmin.sort === "name-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}</span>
              <span className={style.col4}>Correo</span>
              <span className={style.col5}>Productos</span>
            </div>
            {allCarts.length &&
              allCarts.map(cart => (
                <div className={style.table_row} key={cart.id}>
                  <span className={style.col0}>{cart.id}</span>
                  <span className={style.col1}>
                    <span className={style.text}>{cart.status}</span>
                    <AiFillEdit className={style.icon} onClick={() => dispatch(putCartStatus(cart.id))} />
                  </span>
                  <span className={style.col2}>{cart.Books.length && "$ " + cart.Books.reduce((acc, el) => {
                    acc += (el.Books_Carts.quantity * el.price)
                    return Number(acc.toFixed(2))
                  }, 0)}</span>
                  <span className={style.col3}>{cart.User.fullName}</span>
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
          </div>
        </div >
      )}
    </div>
  );
}
