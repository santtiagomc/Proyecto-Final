import React, { useState } from "react";
import { useDispatch } from "react-redux";

import style from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  let [book, setBook] = useState();

  const handleSubmit = (e) => {
    if (state.trim().length !== 0) {
      e.preventDefault();
      dispatch(getSearch(book));
      e.target.reset();
      setBook("");
    } else {
      alert("Valor incorrecto");
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Harry Potter"
        onChange={(e) => setBook(e.target.value.toLowerCase())}
      />
      <button type="submit">Search</button>
    </form>
  );
}
