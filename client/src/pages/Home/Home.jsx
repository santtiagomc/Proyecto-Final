import React from "react";
import { useSelector } from "react-redux";

import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import Cards from "../../components/Cards/Cards.jsx";

import style from "./Home.module.css";
import Card from "../../components/Card/Card.jsx";
import api from "../../api.js";

export default function Home() {
  //const allBooks = useSelector((state) => state.books);
  const allBooks = api.books;

  return (
    <>
      <SearchBar />
      {/* //navbar */}

      <div className={style.container}>
        <Cards />
      </div>
      <div className={style.container}>
        {allBooks.length ? (
          allBooks.map((el, index) => {
            return <Card key={index} image={el.image} price={el.price} />;
          })
        ) : (
          <span className={style.span}>404 not found</span>
        )}
      </div>
    </>
  );
}
