import style from "./Card.module.css";

export default function Card({ image, price }) {
  return (
    <div className={style.container}>
      <div className={style.imageContainer}>
        <img className={style.bookCover} src={image} alt="img-book" />
      </div>
      <div>
        <p className={style.prize}>${price}</p>
      </div>
    </div>
  );
}
