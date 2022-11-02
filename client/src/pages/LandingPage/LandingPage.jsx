import React, { useEffect } from "react";
import promo from "./promo.png";
import promo1 from "./promo1.png";
import calificacion from "./calificacion.png";
import calificacion1 from "./calificacion1.png";
import visitas from "./vistas.png";
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
          <a href="/detail/b91273e9-bd5d-40aa-81b9-2f8966e790df">
            <button className={style.promos}>
              <img src={promo1} alt="carousel" className={style.anuncioImg} />
            </button>
          </a>
        </Carousel>
        <motion.div className={style.sliderContain}>
          <h2 className={style.titles}>Promociones</h2>
          <motion.div
            className={style.slider}
            drag="x"
            dragConstraints={{ right: 0, left: -2423 }}
          >
            {booksByOffers.map((el) => {
              return (
                <motion.div className={style.item}>
                  <Link to={`/detail/${el.id}`} className={style.navlink}>
                    <img src={el.image} className={style.imagen} alt="image" />
                    <p className={style.name}>{el.name}</p>
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
          <button className={style.promos}>
            <img
              src={calificacion}
              alt="carousel"
              className={style.anuncioImg}
            />
          </button>
          <button className={style.promos}>
            <img
              src={calificacion1}
              alt="carousel"
              className={style.anuncioImg}
            />
          </button>
        </Carousel>
        <motion.div className={style.sliderContain}>
          <h2 className={style.titles}>Mas Puntuado</h2>
          <motion.div
            className={style.slider}
            drag="x"
            dragConstraints={{ right: 0, left: -2423 }}
          >
            {booksByRating.map((el) => {
              return (
                <motion.div className={style.item}>
                  <Link to={`/detail/${el.id}`} className={style.navlink}>
                    <img src={el.image} className={style.imagen} alt="image" />
                    <p className={style.name}>{el.name}</p>
                    <p className={style.other}>Calificacion: {el.rating}</p>
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
          <button className={style.promos}>
            <img src={visitas} alt="carousel" className={style.anuncioImg} />
          </button>
        </Carousel>
        <motion.div className={style.sliderContain}>
          <h2 className={style.titles}>Populares</h2>
          <motion.div
            className={style.slider}
            drag="x"
            dragConstraints={{ right: 0, left: -2423 }}
          >
            {booksByVisits.map((el) => {
              return (
                <motion.div className={style.item}>
                  <NavLink to={`/detail/${el.id}`} className={style.navlink}>
                    <img src={el.image} className={style.imagen} alt="image" />
                    <p className={style.name}>{el.name}</p>
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
