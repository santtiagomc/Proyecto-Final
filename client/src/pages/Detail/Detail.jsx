import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearDetail, getDetail } from "../../redux/actions";

import style from "./Detail.module.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const myBook = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(clearDetail());
    dispatch(getDetail(props.match.params.id));
  }, []);

  return (
    <div>
      {myBook.length > 0 ? (
        <div className={style.container}>
          <Link className={style.home} to="/home">
            <button>Home</button>
          </Link>
          <img className={style.image}>{myBook[0].image}</img>
          <h3 className={style.name}>{myBook[0].name}</h3>
          <h1 className={style.edition}>{myBook[0].edition}</h1>
          <p className={style.genre}>{myBook[0].genre.join(" | ")}</p>
          <h1 className={style.author}>{myBook[0].author}</h1>
          <p className={style.description}>{myBook[0].description}</p>
          <h1 className={style.price}>USD {myBook[0].price}</h1>
          <button className={style.cart}>Add to cart</button>
          <h1 className={style.editorial}>{myBook[0].editorial}</h1>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
