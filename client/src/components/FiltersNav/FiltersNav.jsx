import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, changeSearch } from "../../redux/actions";
import style from "./FiltersNav.module.css";

export default function FiltersNav({ editorials }) {
  const { filtersApplied, genres } = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleFilterGenres(e) {
    dispatch(
      changeFilter({
        sort: filtersApplied.sort,
        editorial: filtersApplied.editorial,
        genres: e.target.value,
      })
    );
  }

  function handleFilterEditorial(e) {
    dispatch(
      changeFilter({
        sort: filtersApplied.sort,
        editorial: e.target.value,
        genres: filtersApplied.genres,
      })
    );
  }

  function handleFilterSort(e) {
    dispatch(
      changeFilter({
        sort: e.target.value,
        editorial: filtersApplied.editorial,
        genres: filtersApplied.genres,
      })
    );
  }

  const reset = () => {
    dispatch(changeFilter());
    dispatch(changeSearch());
  };

  return (
    <>
      {/* {books.length && */}
      <nav className={style.navContainer}>
        {/* <h2 className={style.filters}>Filtrar resultados</h2> */}
        <label className={style.label}>Ordenar por:</label>
        <select
          className={style.select}
          name="sort"
          onChange={handleFilterSort}
        >
          <option disabled>-- Nombre del libro --</option>
          <option
            value="A-Z"
            selected={filtersApplied.sort === "A-Z" ? true : false}
          >
            A - Z
          </option>
          <option
            value="Z-A"
            selected={filtersApplied.sort === "Z-A" ? true : false}
          >
            Z - A
          </option>
          <option disabled>-- Precio --</option>
          <option
            value="price-min-max"
            selected={filtersApplied.sort === "price-min-max" ? true : false}
          >
            Menor a mayor
          </option>
          <option
            value="price-max-min"
            selected={filtersApplied.sort === "price-max-min" ? true : false}
          >
            Mayor a menor
          </option>
          <option disabled>-- Año de edición --</option>
          <option
            value="edition-min-max"
            selected={filtersApplied.sort === "edition-min-max" ? true : false}
          >
            Menor a mayor
          </option>
          <option
            value="edition-max-min"
            selected={filtersApplied.sort === "edition-max-min" ? true : false}
          >
            Mayor a menor
          </option>
        </select>

        {/* <label className={style.label}>Editoriales</label> */}
        <select
          className={style.select}
          name="editorial"
          onChange={handleFilterEditorial}
          required={false}
        >
          <option disabled> -- Filtrar por editorial --</option>
          <option
            value="none"
            selected={filtersApplied.editorial === "none" ? true : false}
          >
            {" "}
            Todas las Editoriales
          </option>
          {editorials.length &&
            editorials.map((el) => (
              <option
                key={el}
                value={el}
                selected={filtersApplied.editorial === el ? true : false}
              >
                {el}
              </option>
            ))}
        </select>

        {/* <label className={style.label}>Categorías</label> */}
        <select
          className={style.select}
          name="genres"
          onChange={handleFilterGenres}
        >
          <option disabled>-- Filtrar por categoría --</option>
          <option
            value="none"
            selected={filtersApplied.genres === "none" ? true : false}
          >
            {" "}
            Todas las Categorías
          </option>
          {genres.length &&
            genres.sort().map((el) => (
              <option
                key={el}
                value={el}
                selected={filtersApplied.genres === el ? true : false}
              >
                {el}
              </option>
            ))}
        </select>
        {/* <label className={style.typeFilter}>Todos los libros</label> */}
        <button className={style.resetButton} onClick={reset}>
          Ver todos
        </button>
      </nav>
      {/* } */}
    </>
  );
}
