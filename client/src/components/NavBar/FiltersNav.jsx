import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/actions";

import style from "../../styles/FiltersNav.module.css";

export default function FiltersNav({ authors }) {

  const { filtersApplied, genres } = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleFilterGenres(e) {
    dispatch(changeFilter({ sort: filtersApplied.sort, author: filtersApplied.author, genres: e.target.value }))
  }

  function handleFilterAuthor(e) {
    dispatch(changeFilter({ sort: filtersApplied.sort, author: e.target.value, genres: filtersApplied.genres }))
  }

  function handleFilterSort(e) {
    dispatch(changeFilter({ sort: e.target.value, author: filtersApplied.author, genres: filtersApplied.genres }))
  }

  return (
    <>
      <nav>
        <h2>Filters</h2>
        <label>Ordenar:</label>
        <select
          name="sort"
          onChange={handleFilterSort}
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
          onChange={handleFilterAuthor}>
          <option disabled > -- Filtrar por autor --</option>
          <option value="none" selected={filtersApplied.author === "none" ? true : false}> Todos los autores</option>
          {authors && authors.map((el) => <option value={el} selected={filtersApplied.author === el ? true : false}>{el}</option>)}
        </select>

        <label>Filtrar por género:</label>
        <select
          name="genres"
          onChange={handleFilterGenres}
        >
          <option disabled>-- Filtrar por género --</option>
          <option value="none" selected={filtersApplied.genres === "none" ? true : false}> Todos los géneros</option>
          {genres &&
            genres.sort().map((el) => <option value={el} selected={filtersApplied.genres === el ? true : false}>{el}</option>)}
        </select>
      </nav>
    </>
  );
}
