import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { putStatus } from "../../redux/actions";
import style from "./CardPrueba.module.css";

export default function Card({ id, image, price, name, author, visible }) {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    console.log("anda bien 👍 (leer comentario componente card)");
    //lo dejo comentado porque no vaya a ser que alguien el de a la X y oculte el libro sin querer, hay que ver
    //de hacer que muestre los libros ocultos solo al admin

    dispatch(putStatus(id));
  };

  return (
    <div>
      <div className={style.admin}>
        <button
          className={visible ? style.btnStatusF : style.btnStatusT}
          onClick={(e) => handleClick(e)}
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
        <NavLink to={`/edit/${id}`}>
          <button className={style.btnStatusT}>Edit</button>
        </NavLink>
      </div>
      <NavLink className={style.navLink} to={`/detail/${id}`}>
        <div className={visible ? style.container : style.containerF}>
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
    </div>
  );
}
