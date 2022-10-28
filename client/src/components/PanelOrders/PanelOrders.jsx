import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import style from "./PanelOrders.module.css";

export default function PanelOrders() {
  const { allUsers } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  if (allUsers.length) {
    console.log(allUsers[0]);
  }

  return (
    <div className={style.container}>
      <div className={style.stats_container}>
        <div className={style.stats_sub_container}>
          <div className={style.stats}>tarjeta 1</div>
          <div className={style.stats}>tarjeta 2</div>
        </div>
        <div className={style.stats_sub_container}>
          <div className={style.stats}>tarjeta 3</div>
          <div className={style.stats}>tarjeta 4</div>
        </div>
      </div>
      <div className={style.table_container}>
        <div className={`${style.table_row} ${style.table_row_attributtes}`}>
          <span className={style.col1}>Rol</span>
          <span className={style.col2}>Nombre</span>
          <span className={style.col3}>Correo</span>
          <span className={style.col4}>Estado</span>
          <span className={style.col5}>Provincia</span>
          <span className={style.col6}>Ciudad</span>
          <span className={style.col7}>Dirección</span>
          <span className={style.col8}>Código postal</span>
        </div>
        {/* {allUsers.length && allUsers.map(user => (
          <div className={style.table_row}>
            <span className={style.col1}>{user.role}</span>
            <span className={style.col2}>{user.fullName}</span>
            <span className={style.col3}>{user.email}</span>
            <span className={style.col4}>{user.status}</span>
            <span className={style.col5}>{user.province}</span>
            <span className={style.col6}>{user.city}</span>
            <span className={style.col7}>{user.address}</span>
            <span className={style.col8}>{user.zipCode}</span>
          </div>
        ))} */}
      </div>
    </div>
  );
}
