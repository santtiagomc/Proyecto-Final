import React, {useEffect} from "react";
import promo from "./promo.png"
import promo1 from "./promo1.png"
import promo2 from "./promo2.png"
// import calificacion from "./calificacion.png"
// import calificacion1 from "./calificación1.png"
// import calificacion2 from "./calificacion2.png"
// import visitas from "./vistas.png"
// import visitas1 from "./vistas1.png"
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useDispatch, useSelector } from "react-redux";
import style from "./LandingPage.module.css"
import {getMoreRating, getMoreVisits, getOffers} from "../../redux/actions"
import { motion } from "framer-motion"


export default function LandingPage (){
    
    const dispatch = useDispatch();
    const { booksByRating, booksByVisits, booksByOffers} = useSelector(state => state)
    useEffect(() => {
        dispatch(getOffers());
        dispatch(getMoreVisits());
        dispatch(getMoreRating());
      }, []);
    
    return (
        <div className={style.container}>
            <div>
            <Carousel  autoPlay={true} infiniteLoop showThumbs={false} transitionTime={1000} className={style.containerPromo} >
                <button className={style.promos} >
                    <img src={promo} alt="carousel" height="200px" />
                </button>
                <button className={style.promos}>
                    
                    <img src={promo1} alt="carousel" height="200px" />
                </button>
                <button className={style.promos}>
                    <img src={promo2} alt="carousel" height="200px" />
                </button>
            </Carousel>
            </div>
            <motion.div className={style.sliderContain}>
                <motion.div className={style.slider}>
                <motion.div className={style.item} drag="x" dragConstraints={{right: 0}}>
                {
                    booksByOffers.map(el => {
                            
                                <p className={style.name}>{el.name}</p>,
                                <img src={el.image} alt="image" />,
                                <p className={style.price}>{el.price}</p>
                           
                        
                    })
                } </motion.div>
                </motion.div>
            </motion.div>
            {/* <Carousel autoPlay={true} infiniteLoop showThumbs={false} className={style.container2} >
                <button className={style.card}>
                    <img src={calificacion} alt="carousel" height="200px" />
                </button>
                <button className={style.card}>
                    <img src={calificacion1} alt="carousel" height="200px" />
                </button>
                <button className={style.card}>
                    <img src={calificacion2} alt="carousel" height="200px" />
                </button>
            </Carousel>
            <Carousel autoPlay={true} infiniteLoop showThumbs={false} className={style.container2} >
                <button className={style.card}>
                    <img src={visitas} alt="carousel" height="200px" />
                </button>
                <button className={style.card}>
                    <img src={visitas1} alt="carousel" height="200px" />
                </button>
            </Carousel> */}
        </div>
    )
}