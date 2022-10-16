import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, getFilteredBooks, getGenres, searchBook } from "../../redux/actions";

import style from "../../styles/FiltersNav.module.css";

export default function FiltersNav({ authors }) {

  const { filtersApplied, searchApplied } = useSelector((state) => state);
  const allGenres = useSelector((state) => state.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!allGenres.length) {
      dispatch(getGenres());
    }
  }, []);

  let [filtersLocal, setFiltersLocal] = useState(filtersApplied);

  const handleChange = (e) => {
    setFiltersLocal({ ...filtersLocal, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(changeFilter(filtersLocal));
    dispatch(searchBook(filtersLocal, searchApplied))
  }, [filtersLocal])

  return (
    <>
      <nav>
        <h2>Filters</h2>
        <label>Ordenar:</label>
        <select
          name="sort"
          onChange={(e) => handleChange(e)}
        >
          <option disabled>-- Alphabetical order --</option>
          <option value="A-Z" selected={filtersApplied.sort === "A-Z" ? true : false}>A to Z</option>
          <option value="Z-A" selected={filtersApplied.sort === "Z-A" ? true : false}>Z to A</option>
          <option disabled>-- Order by price --</option>
          <option value="min-max" selected={filtersApplied.sort === "min-max" ? true : false}>Price: Min. to Máx.</option>
          <option value="max-min" selected={filtersApplied.sort === "max-min" ? true : false}>Price: Máx. to Min.</option>
        </select>

        <label>Filtrar por autor:</label>
        <select
          name="author"
          onChange={(e) => handleChange(e)}>
          <option disabled > -- Filtrar por autor --</option>
          <option value="none" selected={filtersApplied.author === "none" ? true : false}> Todos los autores</option>
          {authors && authors.map((el) => <option value={el} selected={filtersApplied.author === el ? true : false}>{el}</option>)}
        </select>

        <label>Filtrar por género:</label>
        <select
          name="genres"
          onChange={(e) => handleChange(e)}
        >
          <option disabled>-- Filtrar por género --</option>
          <option value="none" selected={filtersApplied.genres === "none" ? true : false}> Todos los géneros</option>
          {allGenres &&
            allGenres.sort().map((el) => <option value={el} selected={filtersApplied.genres === el ? true : false}>{el}</option>)}
        </select>
      </nav>
    </>
  );
}
