import style from "./Cards.module.css";
import api from "../../api.js";
import Card from "../Card/Card";

export default function Cards() {
  return (
    <div className={style.cardsContainer}>
      <div>
        <h2>Top 100 mas vendidos</h2>
        <div className={style.categories}>
          {api.books.slice(0, 5).map((book) => {
            return <Card image={book.image} price={book.price} key={book.id} />;
          })}
        </div>
      </div>
      <div>
        <h2>Ciencia Ficcion</h2>
        <div className={style.categories}>
          {api.books.slice(5, 10).map((book) => {
            return <Card image={book.image} price={book.price} key={book.id} />;
          })}
        </div>
      </div>
      <div>
        <h2>Mas buscados</h2>
        <div className={style.categories}>
          {api.books.slice(10, 15).map((book) => {
            return <Card image={book.image} price={book.price} key={book.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
