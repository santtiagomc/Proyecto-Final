import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Card from "../../components/Card/Card.jsx";
import { searchBook } from "../../redux/actions";

import style from "./Home.module.css";
//import api from "../../api.js";

export default function Home() {
  const filteredBooks = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    /* if (!allBooks.length) dispatch(getBooks()); */
    dispatch(searchBook())
  }, []);

  return (
    <>
      <header>
        <SearchBar />
      </header>
      {/* //aca el navbar */}

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
