import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { changeFilter, searchBook } from "../../redux/actions";

import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const filtersApplied = useSelector(state => state.filtersApplied)
  let [book, setBook] = useState("");
  let [options, setOptions] = useState("");

  const handleSubmit = (e) => {
    if (book.trim().length !== 0) {
      e.preventDefault();
      dispatch(changeFilter())
      dispatch(searchBook(filtersApplied, options, book));
      setBook("");
    } else {
      alert("Valor incorrecto");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        className={style.input}
        value={book}
        type="text"
        placeholder="Ingrese un título, autor o editorial"
        onChange={(e) => setBook(e.target.value)}
      />
      <select
        defaultValue='none'
        onChange={(e) => setOptions(e.target.value)}
      >
        <option disabled value='none'>Seleccione una opción</option>
        <option value="all">Todos</option>
        <option value="name">Título</option>
        <option value="author">Autor</option>
        <option value="editorial">Editorial</option>
      </select>

      {!options ? <button disabled>Buscar</button> : <button type="submit">Buscar</button>}

    </form>
  );
}
