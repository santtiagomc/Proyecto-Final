import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Card from "../../components/Card/Card.jsx";
import FiltersNav from "../../components/NavBar/FiltersNav.jsx";
import {
  getGenres,
  searchBook,
  changePage,
  changeFilter,
  changeSearch,
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
    <>
      <header>
        <SearchBar />
      </header>
      {/* //aca el navbar */}
      <FiltersNav editorials={editorials} />
      <div>
        <button onClick={prevPage}>Anterior</button>
        {pages.map((page) => (
          <button key={page} onClick={() => handlePage(page)}>
            {page}
          </button>
        ))}
        <button onClick={nextPage}>Siguiente</button>
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
              />
            );
          })
        ) : (
          <span className={style.span}>{books.messageError}</span>
        )}
      </div>
    </>
  );
}
