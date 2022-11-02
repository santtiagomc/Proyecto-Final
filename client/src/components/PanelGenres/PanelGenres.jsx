import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGenre,
  DELETE_GENRE,
  GENRES_ORDER_ADMIN,
  getAllBooks,
  getCarts,
  getGenres,
  GET_GENRES,
  postGenre,
  POST_GENRE,
} from "../../redux/actions";

import {
  BsFillTrashFill,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
  BsSortNumericDown,
  BsSortNumericUp
} from "react-icons/all";

import Swal from "sweetalert2";
import templateAlert from "../../helpers/templateAlert";
import style from "./PanelGenres.module.css";
import Loader from "../../pages/Home/GIF_aparecer_BooksNook.gif";

const patternOWords = RegExp(/^[a-z ,.'-]+$/i);

const validationJS = (input) => {
  let errors = "";

  if (input.length < 3 || input.length > 30 || !patternOWords.test(input))
    errors = "El nombre no es valido!";
  if (!input.trim().length) errors = "El campo no puede estar vacío!";

  return errors;
};

export default function PanelBooks() {
  const { genres, messageGlobal, messageDeleteGlobal, booksFiltersAdmin, allBooks, allCarts, cartsFiltersAdmin, genresFiltersAdmin } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  // let [rank, setRank] = useState("A-Z");
  let [input, setInput] = useState("");
  let [errors, setErrors] = useState("");

  useEffect(() => {
    if (!allBooks.length) {
      dispatch(getAllBooks(booksFiltersAdmin))
    }
    if (!allCarts.length) {
      dispatch(getCarts(cartsFiltersAdmin))
    }
  }, [])

  //----------------- stats genres ----------------------
  let quantitySalesFinished = {};
  if (allCarts && !allCarts.messageError && allCarts.length) {
    allCarts.forEach(cart => {
      if (cart.status === "Entregado") {
        cart.Books.forEach(book => {
          book.Genres.forEach(genre => {
            quantitySalesFinished[genre.name] = (quantitySalesFinished[genre.name] || 0) + 1;
          })
        })
      }
    });
  }

  let quantitySalesProcessing = {};
  if (allCarts && !allCarts.messageError && allCarts.length) {
    allCarts.forEach(cart => {
      if (cart.status === "Procesando") {
        cart.Books.forEach(book => {
          book.Genres.forEach(genre => {
            quantitySalesProcessing[genre.name] = (quantitySalesProcessing[genre.name] || 0) + 1;
          })
        })
      }
    });
  }

  let quantityBooksGenre = {}
  if (allBooks && !allBooks.messageError && allBooks.length) {
    allBooks.forEach(book => {
      book.Genres.forEach(genre => {
        quantityBooksGenre[genre.name] = (quantityBooksGenre[genre.name] || 0) + 1;
      })
    })
  }

  //----------------- END stats genres ----------------------

  useEffect(() => {
    if (!Array.isArray(messageGlobal)) {
      if (messageGlobal.message) {
        templateAlert(messageGlobal.message, null, "success");
        dispatch({ type: GET_GENRES, payload: [] });
        dispatch({ type: POST_GENRE, payload: [] });
      } else if (messageGlobal.messageError) {
        templateAlert(messageGlobal.messageError, null, "error");
        dispatch({ type: GET_GENRES, payload: [] });
        dispatch({ type: POST_GENRE, payload: [] });
      }
    }
    if (!Array.isArray(messageDeleteGlobal)) {
      if (messageDeleteGlobal.message) {
        templateAlert(messageDeleteGlobal.message, null, "success");
        dispatch({ type: GET_GENRES, payload: [] });
        dispatch({ type: DELETE_GENRE, payload: [] });
      } else if (messageDeleteGlobal.messageError) {
        templateAlert(messageDeleteGlobal.messageError, null, "error");
        dispatch({ type: GET_GENRES, payload: [] });
        dispatch({ type: DELETE_GENRE, payload: [] });
      }
    }
    dispatch(getGenres(genresFiltersAdmin));
  }, [dispatch, genresFiltersAdmin, messageGlobal, messageDeleteGlobal]);

  const handleChange = (e) => {
    setInput(e.target.value);
    setErrors(validationJS(input));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors && input.trim().length) {
      dispatch(postGenre(input));
    } else {
      templateAlert(errors, null, "error");
    }
  };

  const handleDelete = (e, name) => {
    e.preventDefault();
    Swal.fire({
      title: `Estás por eliminar la categoría "${name}."`,
      width: 650,
      text: "¿Quieres confirmar este cambio?",
      icon: "warning",
      iconColor: "#355070",
      showCancelButton: true,
      background: "#19191a",
      color: "#e1e1e1",
      confirmButtonColor: "#355070",
      cancelButtonColor: "#B270A2",
      confirmButtonText: `¡Sí! Eliminar esta categoría`,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteGenre(name));
      }
    });
  };

  return (
    <div className={style.panel_genres}>
      {!genres.length
        ? <img src={Loader} alt="Loader_Logo"></img>
        : (
          <div className={style.container}>
            <div className={style.table_container}>
              <div className={`${style.table_row} ${style.table_row_attributtes}`}>
                <span className={style.col0}>#</span>


                <span
                  className={
                    genresFiltersAdmin.slice(0, 3) === "nam"
                      ? `${style.col1} ${style.col_active}`
                      : style.col1
                  }
                  onClick={() =>
                    dispatch({
                      type: GENRES_ORDER_ADMIN,
                      payload:
                        genresFiltersAdmin === "name-A-Z" ? "name-Z-A" : "name-A-Z",
                    })
                  }><span>Categoría</span>
                  {genresFiltersAdmin === "name-A-Z" ? (
                    <AiOutlineSortAscending className={style.i_order} />
                  ) : (
                    <AiOutlineSortDescending className={style.i_order} />
                  )}
                </span>
                <span
                  className={
                    genresFiltersAdmin.slice(0, 3) === "boo"
                      ? `${style.col2} ${style.col_active}`
                      : style.col2
                  }
                  onClick={() =>
                    dispatch({
                      type: GENRES_ORDER_ADMIN,
                      payload:
                        genresFiltersAdmin === "books-min-max" ? "books-max-min" : "books-min-max",
                    })
                  }><span>Libros</span>
                  {genresFiltersAdmin === "books-min-max" ? (
                    <BsSortNumericDown className={style.i_order} />
                  ) : (
                    <BsSortNumericUp className={style.i_order} />
                  )}
                </span>
                <span
                  className={
                    genresFiltersAdmin.slice(0, 3) === "end"
                      ? `${style.col3} ${style.col_active}`
                      : style.col3
                  }
                  onClick={() =>
                    dispatch({
                      type: GENRES_ORDER_ADMIN,
                      payload:
                        genresFiltersAdmin === "end-min-max" ? "end-max-min" : "end-min-max",
                    })
                  }><span>Órdenes completadas</span>
                  {genresFiltersAdmin === "end-min-max" ? (
                    <BsSortNumericDown className={style.i_order} />
                  ) : (
                    <BsSortNumericUp className={style.i_order} />
                  )}
                </span>
                <span
                  className={
                    genresFiltersAdmin.slice(0, 3) === "pro"
                      ? `${style.col4} ${style.col_active}`
                      : style.col4
                  }
                  onClick={() =>
                    dispatch({
                      type: GENRES_ORDER_ADMIN,
                      payload:
                        genresFiltersAdmin === "proc-min-max" ? "proc-max-min" : "proc-min-max",
                    })
                  }><span>Órdenes abiertas</span>
                  {genresFiltersAdmin === "proc-min-max" ? (
                    <BsSortNumericDown className={style.i_order} />
                  ) : (
                    <BsSortNumericUp className={style.i_order} />
                  )}
                </span>
              </div>
              {genres &&
                genres.length &&
                genres.map((el, index) => {
                  return (
                    <div className={style.table_row} key={index}>
                      <span className={style.col0}>{index + 1}</span>
                      <span className={style.col1}>{el}</span>
                      <span className={style.col2}>{quantityBooksGenre[el] ? quantityBooksGenre[el] : 0}</span>
                      <span className={style.col3}>{quantitySalesFinished[el] ? quantitySalesFinished[el] : 0}</span>
                      <span className={style.col4}>{quantitySalesProcessing[el] ? quantitySalesProcessing[el] : 0}</span>
                    </div>
                  );
                })}
            </div>

            {/* <div className={style.stats_container}>
              <div className={style.subContainer}>
                <div className={style.stats}>
                  <div className={style.addGenre}>
                    <label className={style.label}>Crear categoría</label>
                    <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
                      <input
                        type="text"
                        placeholder="Misterio"
                        autoFocus
                        onChange={(e) => handleChange(e)}
                      />
                      {errors.length > 1 && <span>{errors}</span>}
                      <button type="submit">Añadir categoría</button>
                    </form>
                  </div>
                </div>
                <div className={style.stats}>tarjeta2</div>
              </div>
              <div className={style.subContainer}>
                <div className={style.stats}>tarjeta3</div>
                <div className={style.stats}>tarjeta 4</div>
              </div>
            </div> */}
          </div>
        )}
    </div>
  );
}
