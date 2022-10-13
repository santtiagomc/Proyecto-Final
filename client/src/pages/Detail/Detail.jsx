import React from "react";
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetail, clearDetail } from "../redux/actions"
import { useEffect } from "react";

import style from "./Detail.module.css";

export default function Detail(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearDetail())
        dispatch(getDetail(props.match.params.id))
    }, [])

    const myBook = useSelector ((state) => state.detail)

    return (
        <div>
            {
                myBook.length > 0 ?
                <div>
                    <Link to="/home"><button>Home</button></Link>
                    <h3>{myBook[0].name}</h3>
                    <img>{myBook[0].image}</img>
                    <h1>{myBook[0].author}</h1>
                    <p>{myBook[0].description}</p>
                    <h1>{myBook[0].price}</h1>
                    <p>{myBook[0].genre.join(" | ")}</p>
                    <h1>{myBook[0].editorial}</h1>
                    <h1>{myBook[0].edition}</h1>
                </div>
                : <h1>Loading...</h1>
            }
        </div>
    )
}