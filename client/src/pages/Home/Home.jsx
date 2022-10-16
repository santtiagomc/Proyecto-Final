import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Card from "../../components/Card/Card.jsx";
import FiltersNav from "../../components/NavBar/FiltersNav.jsx";
import { getGenres, searchBook } from "../../redux/actions";

import style from "./HomePrueba.module.css";

export default function Home() {
  const filteredBooks = useSelector((state) => state.books);
  const { filtersApplied, booksCopy, searchApplied, genres } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());;
  }, []);

  useEffect(() => {
    dispatch(searchBook(filtersApplied, searchApplied))
  }, [filtersApplied])

  let allAuthors
  if (!booksCopy.messageError) {
    allAuthors = booksCopy.map((el) => el.author);
    allAuthors = allAuthors.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []).sort();
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
};
