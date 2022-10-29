import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { changeFilter, changeSearch } from "../../redux/actions";

import Swal from "sweetalert2";
import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();

  let [book, setBook] = useState("");
  let [options, setOptions] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (book.trim().length !== 0) {
      dispatch(changeSearch({ option: options, name: book }));
      dispatch(changeFilter());
      setBook("");
      history.push("/");
    } else {
      Swal.fire({
        background: "#19191a",
        color: "#e1e1e1",
        title: "Error",
        text: "El campo no puede estar vacío",
        icon: "error",
        timer: 4000,
        confirmButtonColor: "#355070",
      });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
      <input
        className={style.input}
        value={book}
        type="text"
        placeholder="Ingrese un título o autor"
        onChange={(e) => setBook(e.target.value)}
      />
      <select
        defaultValue="all"
        onChange={(e) => setOptions(e.target.value)}
        className={style.select}
      >
        <option value="all">Todos</option>
        <option value="name">Título</option>
        <option value="author">Autor</option>
      </select>

      {!options ? (
        <button disabled className={style.button}>
          Buscar
        </button>
      ) : (
        <button type="submit" className={style.button}>
          Buscar
        </button>
      )}
      {/* <button type="submit">Buscar</button> */}
    </form>
  );
}
