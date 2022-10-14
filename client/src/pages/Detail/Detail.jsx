import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearDetail, getDetail, GET_DETAIL } from "../../redux/actions";

import style from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const myBook = useSelector((state) => state.detail);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    //dispatch(clearDetail());
    dispatch(getDetail(id));
    return () => {
      dispatch({ type: GET_DETAIL, payload: [] });
    };
  }, []);

  /* if (myBook) {
    const aux = myBook.Genre;
    console.log(aux);
  }
  console.log(myBook); */

  return (
    <>
      <div className={style.container}>
        <img
          className={style.image}
          src={myBook.image}
          alt={`Portada del libro ${myBook.name}`}
        />

        <div className={style.info}>
          <h1 className={style.name}>{myBook.name}</h1>
          <h3 className={style.author}>{myBook.author}</h3>

          <h3 className={style.edition}>{myBook.edition}</h3>
          {/* <p className={style.genre}>{myBook.Genre.join(" | ")}</p> */}
          <h3 className={style.editorial}>{myBook.editorial}</h3>
          <p className={style.description}>{myBook.description}</p>
          <div className={style.container}>
            <h3 className={style.price}>USD {myBook.price}</h3>
            <button className={style.cart}>Add to cart</button>
          </div>
          <Link className={style.home} to="/">
            <button>Home</button>
          </Link>
        </div>
      </div>
      <div>
        {/* MEGA provisional, hacer componente reviews! */}
        <h2>Reviews:</h2>
        <h3>User1234</h3>
        <span>💛💛💛💛</span>
        <p>La verdad es que tremendo</p>
      </div>
    </>
  );
}
