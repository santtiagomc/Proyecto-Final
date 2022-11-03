import React, { useEffect } from "react";
import promo from "./555.jpg";
import promo1 from "./444.jpg";
import calificacion from "./222.jpg";
import calificacion1 from "./333.jpg";
import visitas from "./111.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import style from "./LandingPage.module.css";
import { getMoreRating, getMoreVisits, getOffers } from "../../redux/actions";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";

export default function LandingPage() {
  const dispatch = useDispatch();
  const { booksByRating, booksByVisits, booksByOffers } = useSelector(
    (state) => state
  );
  useEffect(() => {
    dispatch(getOffers());
    dispatch(getMoreVisits());
    dispatch(getMoreRating());
  }, [dispatch]);

  return (
    <div className={style.container}>
      <a href="/detail"></a>
      <div className={style.subContainer}>
        <Carousel
          autoPlay={true}
          infiniteLoop
          showThumbs={false}
          transitionTime={1000}
          className={style.containerPromo}
        >
          <a href="/home">
            <button className={style.promos}>
              <img src={promo} alt="carousel" className={style.anuncioImg} />
            </button>
          </a>
          <a href="detail/cf4c3c8b-4c0e-4505-b27f-0180ce5da78a">
            <button className={style.promos}>
              <img src={promo1} alt="carousel" className={style.anuncioImg} />
            </button>
          </a>
        </Carousel>
        <a href="#popular"></a>
        <motion.div className={style.sliderContain}>
          <h2 className={style.titles}>Promociones</h2>
          <motion.div
            className={style.slider}
            drag="x"
            dragConstraints={{ right: 0, left: -1823 }}
          >
            {booksByOffers.map((el) => {
              return (
                <motion.div className={style.item}>
                  <Link to={`/detail/${el.id}`} className={style.navlink}>
                    <img src={el.image} className={style.imagen} alt="image" />
                    {/* <p className={style.name}>{el.name}</p> */}
                    <p className={style.other}>USD: {el.price}</p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
      <div className={style.subContainer}>
        <Carousel
          autoPlay={true}
          infiniteLoop
          showThumbs={false}
          transitionTime={1000}
          className={style.containerPromo}
        >
          <a href="/">
            <button className={style.promos}>
              <img
                src={calificacion}
                alt="carousel"
                className={style.anuncioImg}
              />
            </button>
          </a>
          <a href="/">
            <button className={style.promos}>
              <img
                src={calificacion1}
                alt="carousel"
                className={style.anuncioImg}
              />
            </button>
          </a>
        </Carousel>
        <motion.div className={style.sliderContain}>
          <h2 className={style.titles}>Mejor puntuados</h2>
          <motion.div
            className={style.slider}
            drag="x"
            dragConstraints={{ right: 0, left: -1823 }}
          >
            {booksByRating.map((el) => {
              return (
                <motion.div className={style.item}>
                  <Link to={`/detail/${el.id}`} className={style.navlink}>
                    <img src={el.image} className={style.imagen} alt="image" />
                    {/* <p className={style.name}>{el.name}</p> */}
                    <p className={style.other}>Calificación: {el.rating}</p>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
      <div className={style.subContainer}>
        <Carousel
          autoPlay={true}
          infiniteLoop
          showThumbs={false}
          transitionTime={1000}
          className={style.containerPromo}
        >
          <a href="/">
            <button className={style.promos}>
              <img src={visitas} alt="carousel" className={style.anuncioImg} />
            </button>
          </a>
        </Carousel>
        <motion.div className={style.sliderContain}>
          <h2 id="popular" className={style.titles}>
            Más visitados
          </h2>
          <motion.div
            className={style.slider}
            drag="x"
            dragConstraints={{ right: 0, left: -1823 }}
          >
            {booksByVisits.map((el) => {
              return (
                <motion.div className={style.item}>
                  <NavLink to={`/detail/${el.id}`} className={style.navlink}>
                    <img src={el.image} className={style.imagen} alt="image" />
                    {/* <p className={style.name}>{el.name}</p> */}
                    <p className={style.other}>Visualizaciones: {el.visits}</p>
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
