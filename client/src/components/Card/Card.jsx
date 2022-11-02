import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { EDIT_ID, putStatus, TABLE_VIEW } from "../../redux/actions";
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
  const { user, userDb } = useSelector((state) => state);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(putStatus(id));
  };

  return (
    <div>
      {
        user ? (
          userDb &&
          (userDb.role === "Admin++" || userDb.role === "Admin" ? (
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
                    history.push(`/admin`);
                    dispatch({ type: EDIT_ID, payload: id })
                  }}
                >
                  <i class="fa-solid fa-pencil"></i>
                </button>
              </div>
              <NavLink className={style.navLink} to={`/detail/${id}`}>
                <div className={visible ? style.container : style.containerF}>
                  <div className={style.imageContainer}>
                    <img
                      className={style.bookCover}
                      src={image}
                      alt="img-book"
                    />
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
          ) : (
            visible && (
              <NavLink className={style.navLink} to={`/detail/${id}`}>
                <div className={visible ? style.container : style.containerF}>
                  <div className={style.imageContainer}>
                    <img
                      className={style.bookCover}
                      src={image}
                      alt="img-book"
                    />
                  </div>
                  <div className={style.information}>
                    <p className={style.name}>{name}</p>
                    <p className={style.author}>{author}</p>
                    <p className={style.edition}>{edition}</p>
                    <p className={style.price}>USD {price}</p>
                  </div>
                </div>
              </NavLink>
            )
          ))
        ) : (
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
        )

        // <div className={style.admin}>
        //   <button
        //     className={visible ? style.btnStatusF : style.btnStatusT}
        //     onClick={(e) => handleClick(e)}
        //   >
        //     {visible ? (
        //       <i class="fa-solid fa-eye-slash"></i>
        //     ) : (
        //       <i class="fa-solid fa-eye"></i>
        //     )}
        //   </button>
        //   <NavLink to={`/edit/${id}`}>
        //     <button className={style.btnStatusT}>
        //       <i class="fa-solid fa-pencil"></i>
        //     </button>
        //   </NavLink>
        // </div>
        // <NavLink className={style.navLink} to={`/detail/${id}`}>
        //   <div className={visible ? style.container : style.containerF}>
        //     <div className={style.imageContainer}>
        //       <img className={style.bookCover} src={image} alt="img-book" />
        //     </div>
        //     <div className={style.information}>
        //       <p className={style.name}>{name}</p>
        //       <p className={style.author}>{author}</p>
        //       <p className={style.edition}>{edition}</p>
        //       <p className={style.price}>USD {price}</p>
        //     </div>
        //   </div>
        // </NavLink>
      }
    </div>
  );
}
