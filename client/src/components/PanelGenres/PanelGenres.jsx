import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGenre,
  DELETE_GENRE,
  getGenres,
  GET_GENRES,
  postGenre,
  POST_GENRE,
} from "../../redux/actions";

import {
  BsFillTrashFill,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/all";

import Swal from "sweetalert2";
import templateAlert from "../../helpers/templateAlert";
import style from "./PanelGenres.module.css";

const patternOWords = RegExp(/^[a-z ,.'-]+$/i);

const validationJS = (input) => {
  let errors = "";

  if (input.length < 3 || input.length > 30 || !patternOWords.test(input))
    errors = "El nombre no es valido!";
  if (!input.trim().length) errors = "El campo no puede estar vacío!";

  return errors;
};

export default function PanelBooks() {
  const { genres, messageGlobal, messageDeleteGlobal } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  let [rank, setRank] = useState("A-Z");
  let [input, setInput] = useState("");
  let [errors, setErrors] = useState("");

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
    dispatch(getGenres(rank));
  }, [rank, messageGlobal, messageDeleteGlobal]);

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
    <div className={style.container}>
      <div className={style.genreListContainer}>
        <div className={style.labelContainer}>
          <label className={style.label1}>#</label>
          <label className={style.label2}>Categoría</label>
          <button
            className={style.btn_rank}
            onClick={() => setRank(rank === "A-Z" ? "Z-A" : "A-Z")}
          >
            {rank === "A-Z" ? (
              <AiOutlineSortAscending className={style.btn_rank} />
            ) : (
              <AiOutlineSortDescending className={style.btn_rank} />
            )}
          </button>
        </div>
        <div className={style.genreList}>
          {genres &&
            genres.length &&
            genres.map((el, index) => {
              return (
                <div key={index} className={style.genreLine}>
                  <span className={style.span1}>{index + 1}</span>
                  <span className={style.span2}>{el}</span>
                  <button
                    className={style.btnDelete}
                    onClick={(e) => handleDelete(e, el)}
                  >
                    <BsFillTrashFill />
                  </button>
                </div>
              );
            })}
        </div>
      </div>

      <div className={style.stats_container}>
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
      </div>
    </div>
  );
}
