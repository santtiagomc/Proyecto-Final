import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, getFilteredBooks, getGenres } from "../../redux/actions";

import style from "../../styles/FiltersNav.module.css";

export default function FiltersNav({ authors }) {

  const filtersApplied = useSelector((state) => state.filtersApplied);
  const allGenres = useSelector((state) => state.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  let [filtersLocal, setFiltersLocal] = useState(filtersApplied);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFiltersLocal({ ...filtersLocal, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(changeFilter(filtersLocal));
  }, [filtersLocal])

  return (
    <>
      <nav>
        <h2>Filters</h2>
        <select
          name="sort"
          // defaultValue={filtersApplied.sort}
          onChange={(e) => handleChange(e)}
        >
          <option disabled>-- Alphabetical order --</option>
          <option value="A-Z" selected={filtersApplied.sort === "A-Z" ? true : false}>A to Z</option>
          <option value="Z-A" selected={filtersApplied.sort === "Z-A" ? true : false}>Z to A</option>
          <option disabled>-- Order by price --</option>
          <option value="min-max" selected={filtersApplied.sort === "min-max" ? true : false}>Price: Min. to Máx.</option>
          <option value="max-min" selected={filtersApplied.sort === "max-min" ? true : false}>Price: Máx. to Min.</option>
        </select>

        <select
          name="author"
          // defaultValue={filtersApplied.author !== "none" ? filtersApplied.author : "default"}
          onChange={(e) => handleChange(e)}>
          <option disabled selected={filtersApplied.author === "none" ? true : false}> -- Filter by author --</option>
          {authors && authors.map((el) => <option value={el} selected={filtersApplied.author === el ? true : false}>{el}</option>)}
        </select>

        <select
          name="genres"
          // defaultValue={filtersApplied.genres !== "none" ? filtersApplied.genres : "default"}
          onChange={(e) => handleChange(e)}
        >
          <option disabled selected={filtersApplied.genres === "none" ? true : false}>-- Filter by genres --</option>
          {allGenres &&
            allGenres.sort().map((el) => <option value={el} selected={filtersApplied.genres === el ? true : false}>{el}</option>)}
        </select>
      </nav>
    </>
  );
}
