import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter, getFilteredBooks, getGenres } from "../../redux/actions";

import style from "../../styles/FiltersNav.module.css";

export default function FiltersNav({ authors }) {
  console.log(authors);
  const filtersGlobal = useSelector((state) => state.filtersApplied);
  const allGenres = useSelector((state) => state.genres);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  let [filtersLocal, setFiltersLocal] = useState(filtersGlobal);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFiltersLocal({ ...filtersLocal, [e.target.name]: e.target.value });
    dispatch(changeFilter(filtersLocal));
  };

  /* useEffect(() => {
    dispatch(getFilteredBooks(filtersGlobal));
  }, [filtersGlobal]); 
 	
  posible tirada al home
  */

  return (
    <>
      <nav>
        <h2>Filters</h2>
        <select
          name="sort"
          defaultValue="default"
          onChange={(e) => handleChange(e)}
        >
          <option value="default" disabled>
            -- Alphabetical order --
          </option>
          <option value="asc">A to Z</option>
          <option value="desc">Z to A</option>
        </select>

        <select
          name="sort"
          defaultValue="default"
          onChange={(e) => handleChange(e)}
        >
          <option value="default" disabled>
            -- Order by price --
          </option>
          <option value="max">Min. to Máx.</option>
          <option value="min">Máx. to Min.</option>
        </select>

        <select
          name="author"
          defaultValue="default"
          onChange={(e) => handleChange(e)}
        >
          <option value="default" disabled>
            -- Filter by author --
          </option>
          {authors && authors.map((el) => <option value={el}>{el}</option>)}
        </select>

        <select
          name="genres"
          defaultValue="default"
          onChange={(e) => handleChange(e)}
        >
          <option value="default" disabled>
            -- Filter by genres --
          </option>
          {allGenres &&
            allGenres.sort().map((el) => <option value={el}>{el}</option>)}
        </select>
      </nav>
    </>
  );
}
