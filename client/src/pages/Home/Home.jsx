import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card.jsx";
import FiltersNav from "../../components/FiltersNav/FiltersNav.jsx";
import {
  getGenres,
  searchBook,
  changePage,
  getEditorials,
  changeFilter,
  changeSearch,
  postCart,
  getUserCart,
} from "../../redux/actions";
import Swal from "sweetalert2";

import style from "./HomePrueba.module.css";

export default function Home() {
  const {
    filtersApplied,
    searchApplied,
    genres,
    page,
    total,
    editorials,
    books,
    user,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const pages = [];

  //---------------- Pasar carrito de invitado a base de datos de usuario cuando inicia sesión ---------------
  let repeatedIdArrayCart = [];
  let uniqueIdArrayCart = [];
  if (localStorage.length) {
    repeatedIdArrayCart = localStorage.getItem("cart").split(",");
    uniqueIdArrayCart = [...new Set(repeatedIdArrayCart)];
  }

  useEffect(() => {
    if (user && user.uid) {
      if (uniqueIdArrayCart.length) {

        dispatch(postCart({ userId: user.uid, bookId: uniqueIdArrayCart, suma: true }))

        setTimeout(function () {
          dispatch(getUserCart(user.uid));
          localStorage.clear()
        }, 2500);
      }
    }
  }, [])
  //---------------- Pasar carrito de invitado a base de datos de usuario cuando inicia sesión ---------------


  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
    if (!editorials.length) dispatch(getEditorials());
    dispatch(searchBook(filtersApplied, searchApplied, page));
  }, [filtersApplied, page, searchApplied]);

  useEffect(() => {
    if (books.messageError) {
      Swal.fire({
        background: "#19191a",
        color: "#e1e1e1",
        title: "Oops...",
        text: books.messageError,
        icon: "error",
        timer: 4000,
      });
      dispatch(changeFilter());
      dispatch(changeSearch());
    }
  }, [books]);



  const nextPage = () => {
    if (page + 10 < total) {
      dispatch(changePage(page + 10));
    }
  };

  const prevPage = () => {
    if (page > 0) {
      dispatch(changePage(page - 10));
    }
  };

  const handlePage = (page) => {
    dispatch(changePage(page * 10 - 10));
  };

  for (let i = 1; i <= Math.ceil(total / 10); i++) {
    pages.push(i);
  }

  return (
    <div className={style.homeContainer}>
      <FiltersNav editorials={editorials} />
      <div className={style.cardsContainer}>
        <div className={style.pagination}>
          <button className={style.btnNextPrev} onClick={prevPage}>
            Anterior
          </button>
          {pages.map((el, index) => (
            <button
              className={
                index === page / 10
                  ? style.btnNumbersSelected
                  : style.btnNumbers
              }
              key={el}
              onClick={() => handlePage(el)}
            >
              {el}
            </button>
          ))}
          <button className={style.btnNextPrev} onClick={nextPage}>
            Siguiente
          </button>
        </div>

        <div className={style.grid}>
          {!books.messageError ? (
            books.map((book) => {
              return (
                <Card
                  key={book.id}
                  id={book.id}
                  image={book.image}
                  price={book.price}
                  name={book.name}
                  author={book.author}
                  edition={book.edition}
                  visible={book.visible}
                />
              );
            })
          ) : (
            <span className={style.span}></span>
          )}
        </div>

        <div className={style.pagination}>
          <button className={style.btnNextPrev} onClick={prevPage}>
            Anterior
          </button>
          {pages.map((el, index) => (
            <button
              className={
                index === page / 10
                  ? style.btnNumbersSelected
                  : style.btnNumbers
              }
              key={el}
              onClick={() => handlePage(el)}
            >
              {el}
            </button>
          ))}
          <button className={style.btnNextPrev} onClick={nextPage}>
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
