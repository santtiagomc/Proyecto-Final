import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/Card/Card.jsx";
import FiltersNav from "../../components/FiltersNav/FiltersNav.jsx";
import {
  getGenres,
  searchBook,
  changePage,
  getEditorials,
} from "../../redux/actions";

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
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const pages = [];

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
    if (!editorials.length) dispatch(getEditorials());
    dispatch(searchBook(filtersApplied, searchApplied, page));
  }, [filtersApplied, page, searchApplied]);

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
          <button className={style.button} onClick={prevPage}>
            Anterior
          </button>
          {pages.map((page) => (
            <button
              className={style.button}
              key={page}
              onClick={() => handlePage(page)}
            >
              {page}
            </button>
          ))}
          <button className={style.button} onClick={nextPage}>
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
                  visible={book.visible}
                />
              );
            })
          ) : (
            <span className={style.span}>{books.messageError}</span>
          )}
        </div>
      </div>
    </div>
  );
}
