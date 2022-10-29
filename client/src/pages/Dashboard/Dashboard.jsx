import React, { useState } from "react";
import style from "./Dashboard.module.css";
import PanelUsers from "../../components/PanelUsers/PanelUsers";
import PanelBooks from "../../components/PanelBooks/PanelBooks";
import PanelOrders from "../../components/PanelOrders/PanelOrders";

import { useHistory } from "react-router-dom";
import CreateBook from "../CreateBook/CreateBook";

export default function Dashboard() {
  const [hovered, setHovered] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [tableView, setTableView] = useState("users");
  const history = useHistory();

  console.log(tableView);
  return (
    <div className={style.container}>
      <div
        className={
          !hidden ? style.navigation : `${style.navigation} ${style.active}`
        }
      >
        <ul>
          <li onClick={() => history.push("/")}>
            <i className="fa-solid fa-house"></i>
            <span className={style.title}>Inicio</span>
          </li>
          <li
            onClick={() => {
              setTableView("users");
              setHovered(2);
            }}
            className={hovered === 2 && style.hovered}
          >
            <i className="fa-solid fa-users"></i>
            <span className={style.title}>Usuarios</span>
          </li>
          <li
            onClick={() => {
              setTableView("orders");
              setHovered(3);
            }}
            className={hovered === 3 && style.hovered}
          >
            <i className="fa-solid fa-file-invoice-dollar"></i>
            <span className={style.title}>Órdenes</span>
          </li>
          <li
            onClick={() => {
              setTableView("books");
              setHovered(4);
            }}
            className={hovered === 4 && style.hovered}
          >
            <i className="fa-solid fa-book"></i>
            <span className={style.title}>Libros</span>
          </li>
          <li
            onClick={() => {
              setTableView("users");
              setHovered(5);
            }}
            className={hovered === 5 && style.hovered}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span className={style.title}>Cerrar sesión</span>
          </li>
        </ul>
      </div>
      <div>
        <div className={!hidden ? style.main : `${style.main} ${style.active}`}>
          <div className={style.topbar}>
            <div
              className={style.toggle}
              onClick={hidden ? () => setHidden(false) : () => setHidden(true)}
            >
              <i className="fa-solid fa-bars"></i>
            </div>
            <div className={style.search}>
              <label>
                <input type="text" placeholder="Búsque aquí" />
                <i class="fa-solid fa-magnifying-glass"></i>
              </label>
            </div>
            <div className={style.logo}></div>
          </div>

          <div>
            {tableView === "users" ? (
              <PanelUsers />
            ) : tableView === "orders" ? (
              <PanelOrders />
            ) : (
              <PanelBooks />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
