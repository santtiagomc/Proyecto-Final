import React, { useEffect, useState } from "react";
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
  getUserDb,
} from "../../redux/actions";
import Swal from "sweetalert2";
import Loader from "./GIF_neón_BooksNook.gif";
import Loader2 from "./GIF_aparecer_BooksNook.gif";
import Loader3 from "./GIF_bloque_BooksNook.gif";

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
    userDb,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const pages = [];

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
    if (!editorials.length) dispatch(getEditorials());
    if (user && user.uid) {
      if (userDb.role === "Admin++" || userDb.role === "Admin") {
        setTimeout(function () {
          dispatch(
            searchBook(filtersApplied, searchApplied, page, userDb.role)
          );
        }, 300);
      } else {
        setTimeout(function () {
          dispatch(searchBook(filtersApplied, searchApplied, page));
        }, 200);
        // dispatch(searchBook(filtersApplied, searchApplied, page));
      }
    }
    setTimeout(function () {
      dispatch(searchBook(filtersApplied, searchApplied, page));
    }, 200);
    // dispatch(searchBook(filtersApplied, searchApplied, page));
  }, [filtersApplied, page, searchApplied, user, userDb]);

  useEffect(() => {
    if (books.messageError) {
      Swal.fire({
        background: "#19191a",
        color: "#e1e1e1",
        title: "Oops...",
        text: books.messageError,
        icon: "error",
        timer: 4000,
        confirmButtonColor: "#355070",
      });
      dispatch(changeFilter());
      dispatch(changeSearch());
    }
  }, [books]);

  const nextPage = () => {
    if (page + 12 < total) {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
      dispatch(changePage(page + 12));
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
      dispatch(changePage(page - 12));
    }
  };

  const handlePage = (newPage) => {
    if (newPage * 12 - 12 !== page) {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
      }, 1000);
      dispatch(changePage(newPage * 12 - 12));
    }
  };

  for (let i = 1; i <= Math.ceil(total / 12); i++) {
    pages.push(i);
  }

  return (
    <div className={style.homeContainer}>
      <FiltersNav editorials={editorials} />
      <div className={style.cardsContainer}>
        {books.length && !books.messageError && (
          <div className={style.pagination}>
            <button
              className={
                page > 1
                  ? style.btnNextPrev
                  : `${style.btnNextPrev} ${style.btnNextPrevDisabled}`
              }
              onClick={prevPage}
            >
              Anterior
            </button>
            {pages.map((el, index) => (
              <button
                className={
                  index === page / 12
                    ? style.btnNumbersSelected
                    : style.btnNumbers
                }
                key={el}
                onClick={() => handlePage(el)}
              >
                {el}
              </button>
            ))}
            <button
              className={
                page / 12 !== Math.floor(total / 12)
                  ? style.btnNextPrev
                  : `${style.btnNextPrev} ${style.btnNextPrevDisabled}`
              }
              onClick={nextPage}
            >
              Siguiente
            </button>
          </div>
        )}
        <div className={style.grid}>
          {!books.messageError ? (
            books.length && !loader ? (
              books.map((book) => (
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
              ))
            ) : (
              <img src={Loader2} alt="Logo loader" className={style.loader} />
            )
          ) : (
            ""
          )}
        </div>

        {books.length && !books.messageError && !loader && (
          <div className={style.pagination}>
            <button
              className={
                page > 1
                  ? style.btnNextPrev
                  : `${style.btnNextPrev} ${style.btnNextPrevDisabled}`
              }
              onClick={prevPage}
            >
              Anterior
            </button>
            {pages.map((el, index) => (
              <button
                className={
                  index === page / 12
                    ? style.btnNumbersSelected
                    : style.btnNumbers
                }
                key={el}
                onClick={() => handlePage(el)}
              >
                {el}
              </button>
            ))}
            <button
              className={
                page / 12 !== Math.floor(total / 12)
                  ? style.btnNextPrev
                  : `${style.btnNextPrev} ${style.btnNextPrevDisabled}`
              }
              onClick={nextPage}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
