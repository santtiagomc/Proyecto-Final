import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./PanelSideBar.module.css";

export default function PanelSideBar() {
  const [hovered, setHovered] = useState(0)

  return (
    <div className={style.navigation}>
      <ul>
        <NavLink to="/home">
          <li onClick={() => setHovered(1)} className={hovered === 1 && style.hovered}>
            <i className="fa-solid fa-house"></i>
            <span className={style.title}>Volver al inicio</span>
          </li>
        </NavLink>
        <NavLink to="/admin/users">
          <li onClick={() => setHovered(2)} className={hovered === 2 && style.hovered}>
            <i className="fa-solid fa-users"></i>
            <span className={style.title}>Usuarios</span>
          </li>
        </NavLink>
        <NavLink to="/admin/orders">
          <li onClick={() => setHovered(3)} className={hovered === 3 && style.hovered}>
            <i className="fa-solid fa-clipboard-check"></i>
            <span className={style.title}>Historial de órdenes</span>
          </li>
        </NavLink>
        <NavLink to="/admin/books">
          <li onClick={() => setHovered(4)} className={hovered === 4 && style.hovered}>
            <i className="fa-solid fa-book"></i>
            <span className={style.title}>Libros</span>
          </li>
        </NavLink>
        <NavLink to="/admin/account">
          <li onClick={() => setHovered(5)} className={hovered === 5 && style.hovered}>
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span className={style.title}>Mi cuenta</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}
