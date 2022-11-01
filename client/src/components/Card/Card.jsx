import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { putStatus, TABLE_VIEW } from "../../redux/actions";
import style from "./CardPrueba.module.css";

export default function Card({
  id,
  image,
  price,
  name,
  author,
  edition,
  visible,
}) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(putStatus(id));
  };

  return (
    <div>
      <div className={style.admin}>
        <button
          className={visible ? style.btnStatusF : style.btnStatusT}
          onClick={(e) => handleClick(e)}
        >
          {visible ? (
            <i class="fa-solid fa-eye-slash"></i>
          ) : (
            <i class="fa-solid fa-eye"></i>
          )}
        </button>
        <button
          className={style.btnStatusT}
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: TABLE_VIEW, payload: "addBook" });

            history.push(`/admin?id=${id}`);
          }}
        >
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
      <NavLink className={style.navLink} to={`/detail/${id}`}>
        <div className={visible ? style.container : style.containerF}>
          <div className={style.imageContainer}>
            <img className={style.bookCover} src={image} alt="img-book" />
          </div>
          <div className={style.information}>
            <p className={style.name}>{name}</p>
            <p className={style.author}>{author}</p>
            <p className={style.edition}>{edition}</p>
            <p className={style.price}>USD {price}</p>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
