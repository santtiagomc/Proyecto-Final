import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions";
import style from "./PanelUsers.module.css";

export default function PanelUsers() {
  const { allUsers } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])
  if (allUsers.length) {
    console.log(allUsers[0])
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
          <span className={style.role}>Rol</span>
          <span className={style.fullName}>Nombre</span>
          <span className={style.email}>Correo</span>
          <span className={style.status}>Estado</span>
          <span className={style.province}>Provincia</span>
          <span className={style.city}>Ciudad</span>
          <span className={style.address}>Dirección</span>
          <span className={style.zipCode}>Código postal</span>
        </div>
        {allUsers.length && allUsers.map(user => (
          <div className={style.table_row}>
            <span className={style.role}>{user.role}</span>
            <span className={style.fullName}>{user.fullName}</span>
            <span className={style.email}>{user.email}</span>
            <span className={style.status}>{user.status}</span>
            <span className={style.province}>{user.province}</span>
            <span className={style.city}>{user.city}</span>
            <span className={style.address}>{user.address}</span>
            <span className={style.zipCode}>{user.zipCode}</span>
          </div>
        ))}
      </div>
    </div>

  );
}
