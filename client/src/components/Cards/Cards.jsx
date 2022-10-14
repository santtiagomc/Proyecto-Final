import { useEffect } from "react";
import api from "../../api.js";
import Card from "../Card/Card";

import style from "./Cards.module.css";

export default function Cards() {
  useEffect(() => {}, []);

  return (
    <div className={style.cardsContainer}>
      <div>
        <h2 className={style.titles}>Top 100 mas vendidos</h2>
        <div className={style.categories}>
          {api.books.slice(0, 5).map((book) => {
            return (
              <Card
                image={book.image}
                price={book.price}
                key={book.id}
                name={book.name}
                author={book.author}
              />
            );
          })}
        </div>
      </div>
      <div>
        <h2 className={style.titles}>Ciencia Ficcion</h2>
        <div className={style.categories}>
          {api.books.slice(5, 10).map((book) => {
            return (
              <Card
                image={book.image}
                price={book.price}
                key={book.id}
                name={book.name}
                author={book.author}
              />
            );
          })}
        </div>
      </div>
      <div>
        <h2 className={style.titles}>Mas buscados</h2>
        <div className={style.categories}>
          {api.books.slice(10, 15).map((book) => {
            return (
              <Card
                image={book.image}
                price={book.price}
                key={book.id}
                name={book.name}
                author={book.author}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
