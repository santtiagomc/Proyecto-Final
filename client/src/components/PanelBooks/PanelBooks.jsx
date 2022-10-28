import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, putStatus, PUT_STATUS } from "../../redux/actions";

import {
  MdDescription,
  BiCategory,
  BiImage,
  BsFillPencilFill,
  BsFillTrashFill,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/all";
import Swal from "sweetalert2";
import templateAlert from "../../helpers/templateAlert";
import style from "./PanelBooks.module.css";

export default function PanelBooks() {
  const { allBooks, putStatusBook } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (putStatusBook.length) {
      if (putStatusBook.message) {
        console.log("entra");
        templateAlert(putStatusBook.message, null, "success", 1000);
        dispatch({ type: PUT_STATUS, payload: {} });
      } else {
        templateAlert(putStatusBook.messageError, null, "error", 1000);
        dispatch({ type: PUT_STATUS, payload: {} });
      }
    }
    dispatch(getAllBooks());
  }, [putStatusBook]);

  const handleImage = (image, name) => {
    Swal.fire({
      background: "#19191a",
      color: "#e1e1e1",
      imageUrl: image,
      imageWidth: 361,
      imageHeight: 554,
      imageAlt: `Cover of ${name}`,
    });
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    dispatch(putStatus(id));
  };

  let totalBooks =
    allBooks &&
    allBooks.reduce((acc, el) => {
      return acc + el.stock;
    }, 0);

  /* console.log(putStatusBook);
  console.log(allBooks); */
  return (
    <div className={style.container}>
      <div className={style.stats_container}>
        <div className={style.stats_sub_container}>
          <div className={style.stats}>Crear libro</div>
          <div className={style.stats}>
            <h2>Libros unicos: {allBooks.length}</h2>
          </div>
        </div>
        <div className={style.stats_sub_container}>
          <div className={style.stats}>Libros totales: {totalBooks}</div>
          <div className={style.stats}>tarjeta 4</div>
        </div>
      </div>
      <div className={style.table_container}>
        <div className={`${style.table_row} ${style.table_row_attributtes}`}>
          <span className={style.col0}>#</span>
          <span className={style.col1}>Nombre</span>
          <span className={style.col2}>Autor</span>
          <span className={style.col3}>Año</span>
          <span className={style.col4}>Categorías</span>
          <span className={style.col5}>Portada</span>
          <span className={style.col6}>Descripción</span>
          <span className={style.col7}>Editorial</span>
          <span className={style.col8}>Precio</span>
          <span className={style.col9}>Stock</span>
          <span className={style.col10}>Editar</span>
          <span className={style.col11}>Ocultar</span>
        </div>
        {allBooks.length &&
          allBooks.map((el, index) => (
            <div className={style.table_row} key={index}>
              <span className={style.col0}>{index}</span>
              <span className={style.col1}>{el.name}</span>
              <span className={style.col2}>{el.author}</span>
              <span className={style.col3}>{el.edition}</span>
              <span className={style.col4}>
                {el.Genres.length > 1 ? (
                  <button
                    className={style.btn}
                    onClick={() =>
                      templateAlert(
                        "Categorías",
                        el.Genres.map((ele) => ele.name).join(", ")
                      )
                    }
                  >
                    <BiCategory />
                  </button>
                ) : (
                  el.Genres.map((ele) => ele.name)
                )}
              </span>
              <span className={style.col5}>
                <button
                  className={style.btn}
                  onClick={() => handleImage(el.image, el.name)}
                >
                  <BiImage />
                </button>
              </span>
              <span className={style.col6}>
                <button
                  className={style.btn}
                  onClick={() => templateAlert("Descripción", el.description)}
                >
                  <MdDescription />
                </button>
              </span>
              <span className={style.col7}>{el.editorial}</span>
              <span className={style.col8}>{el.price}</span>
              <span className={style.col9}>{el.stock}</span>
              <span className={style.col10}>
                <BsFillPencilFill />
              </span>
              <span
                className={style.col11}
                onClick={(e) => handleClick(e, el.id)}
              >
                {el.visible ? <AiFillEye /> : <AiFillEyeInvisible />}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}
