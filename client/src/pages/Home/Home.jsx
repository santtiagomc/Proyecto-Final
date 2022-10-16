import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Card from "../../components/Card/Card.jsx";
import FiltersNav from "../../components/NavBar/FiltersNav.jsx";
import { getGenres, searchBook, changePage } from "../../redux/actions";

import style from "./HomePrueba.module.css";

export default function Home() {
  const filteredBooks = useSelector((state) => state.books);
  const { filtersApplied, booksCopy, searchApplied, genres, page, total } =
    useSelector((state) => state);
  const dispatch = useDispatch();
  const pages = [];

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
  }, []);

  useEffect(() => {
    dispatch(searchBook(filtersApplied, searchApplied, page));
  }, [filtersApplied, page]);

  let allAuthors;
  if (!booksCopy.messageError) {
    allAuthors = booksCopy.map((el) => el.author);
    allAuthors = allAuthors
      .reduce((acc, item) => {
        if (!acc.includes(item)) {
          acc.push(item);
        }
        return acc;
      }, [])
      .sort();
  }

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
        <Link to="/create">
          <button>CREAR</button>
        </Link>
      </header>
      {/* //aca el navbar */}
      <FiltersNav authors={allAuthors} />
      <div>
        <button onClick={prevPage}>prev</button>
        {pages.map((page) => (
          <button onClick={() => handlePage(page)}>{page}</button>
        ))}
        <button onClick={nextPage}>next</button>
      </div>
      <div className={style.grid}>
        {filteredBooks.length ? (
          filteredBooks.map((el, index) => {
            return (
              <Card
                key={index}
                id={el.id}
                image={el.image}
                price={el.price}
                name={el.name}
                author={el.author}
              />
            );
          })
        ) : (
          <span className={style.span}>{filteredBooks.messageError}</span>
        )}
      </div>
    </>
  );
}
