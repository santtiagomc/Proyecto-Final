import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../redux/actions";

import {} from "react-icons/all";
import Swal from "sweetalert2";
import templateAlert from "../../helpers/templateAlert";
import style from "./PanelGenres.module.css";

export default function PanelBooks() {
  const { genres } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres("A-Z"));
  }, []);

  console.log(genres);
  return (
    <div className={style.container}>
      <div className={style.stats_container}>
        <div className={style.stats_sub_container}>
          <div className={style.stats}>tarjeta</div>
          <div className={style.stats}>tarjeta</div>
        </div>
        <div className={style.stats_sub_container}>
          <div className={style.stats}>tarjeta</div>
          <div className={style.stats}>tarjeta 4</div>
        </div>
      </div>
      <div className={style.genreList}>
        {genres &&
          genres.length &&
          genres.map((el, index) => {
            return <span key={index}>{el}</span>;
          })}
      </div>
    </div>
  );
}
