import { NavLink } from "react-router-dom";
import style from "./Card.module.css";

export default function Card({ id, image, price, name, author }) {
  //console.log(name.length);
  return (
    <NavLink className={style.navLink} to={`/detail/${id}`}>
      <div className={style.container}>
        <div className={style.imageContainer}>
          <img className={style.bookCover} src={image} alt="img-book" />
        </div>
        <div className={style.information}>
          <p className={style.name}>{name}</p>
          <p className={style.author}>{author}</p>
          <p className={style.price}>USD {price}</p>
        </div>
      </div>
    </NavLink>
  );
}
