import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBooks,
  putStatus,
  PUT_STATUS,
  TABLE_VIEW,
} from "../../redux/actions";
import { useHistory } from "react-router-dom";

import {
  MdDescription,
  BiCategory,
  BiImage,
  BsFillPencilFill,
  BsFillTrashFill,
  AiFillEye,
  AiFillEyeInvisible,
} from "react-icons/all";
import Swal from "sweetalert2";
import templateAlert from "../../helpers/templateAlert";
import style from "./PanelDashboard.module.css";

export default function PanelBooks() {
  const { allBooks, putStatusBook } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className={style.container}>
      <div className={style.parent}>
        <div className={style.div1}> Hola como va </div>
        <div className={style.div2}> Hola como va </div>
        <div className={style.div3}> Hola como va </div>
        <div className={style.div4}> Hola como va </div>
        <div className={style.div5}> Hola como va </div>
        <div className={style.div6}> Hola como va </div>
        <div className={style.div7}> Hola como va </div>
      </div>
    </div>
  );
}
