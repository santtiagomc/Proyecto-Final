import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Card from "../../components/Card/Card.jsx";
import FiltersNav from "../../components/NavBar/FiltersNav.jsx";

import { getBooks, getFilteredBooks } from "../../redux/actions.js";

import style from "./HomePrueba.module.css";
import api from "../../api.js";

export default function Home() {
  const allBooks = useSelector((state) => state.books);
  const { filtersApplied, booksCopy } = useSelector(state => state);
  const dispatch = useDispatch();
  //const allBooks = api.books;


  useEffect(() => {
    if (filtersApplied.sort !== "A-Z" || filtersApplied.genres !== "none" || filtersApplied.author !== "none") {
      dispatch(getFilteredBooks(filtersApplied))
    } else {
      dispatch(getBooks());
    }
  }, [filtersApplied]);

  let allAuthors = booksCopy && booksCopy.map((el) => el.author);
  console.log(allAuthors);
  let authorsFiltered =
    allAuthors &&
    allAuthors.reduce((acc, item) => {
      if (!acc.includes(item)) {
        acc.push(item);
      }
      return acc;
    }, []);
  console.log(authorsFiltered);

  return (
    <>
      <header>
        <SearchBar />
      </header>
      {/* //aca el navbar */}
      <FiltersNav authors={authorsFiltered.sort()} />

      <div className={style.grid}>
        {allBooks.length ? (
          allBooks.map((el, index) => {
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
          <span className={style.span}>404 not found</span>
        )}
      </div>
    </>
  );
}
