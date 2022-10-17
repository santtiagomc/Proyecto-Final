import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getDetail, GET_DETAIL } from "../../redux/actions";
// import Card from "../../components/Card/Card";

import Review from "../../components/Review/Review.jsx";
import style from "./DetailPrueba.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const myBook = useSelector((state) => state.detail);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
    return () => {
      dispatch({ type: GET_DETAIL, payload: [] });
    };
  }, []);
  // intente usar el object.keys pero no funciono no se por que
  return (
    <>
      {myBook.name ? (
        <div>
          <div className={style.container}>
            <div>
              <img
                className={style.image}
                src={myBook.image}
                alt={`Portada del libro ${myBook.name}`}
              />
            </div>
            <div className={style.info}>
              <h2 className={style.name}>{myBook.name}</h2>
              <h3 className={style.author}>{myBook.author}</h3>
              <span className={style.rating}>
                &#9733; &#9733; &#9733; &#9733;
              </span>
              <h3 className={style.edition}>{myBook.edition}</h3>
              <span className={style.genre}>Terror</span>
              <span className={style.genre}>Accion</span>
              {/* {myBook.genres?.map((genre) => (
          <span key={genre.name}>{genre.name}</span>
        ))} */}
              <h3 className={style.editorial}>{myBook.editorial}</h3>
              <p className={style.description}>{myBook.description}</p>
              <div className={style.containerBuy}>
                <h3 className={style.price}>USD {myBook.price}</h3>
                <button className={style.cart}>Add to cart</button>
              </div>
            </div>
          </div>
          <Review />
        </div>
      ) : (
        <div className={style.loaderContainer}>
          <span className={style.loader}></span>
        </div>
      )}
    </>
  );
}
