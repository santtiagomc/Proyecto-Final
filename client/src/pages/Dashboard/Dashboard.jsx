import React, { useState } from "react";
import style from "./Dashboard.module.css";
import PanelUsers from "../../components/PanelUsers/PanelUsers";
import PanelBooks from "../../components/PanelBooks/PanelBooks";
import PanelOrders from "../../components/PanelOrders/PanelOrders";
import PanelGenres from "../../components/PanelGenres/PanelGenres";
import {
  GiBookshelf,
  FaBook,
  ImBooks,
  MdCategory,
  FaUsers,
  FaFileInvoiceDollar,
  MdDashboardCustomize,
} from "react-icons/all";

import { useHistory } from "react-router-dom";
import CreateBook from "../CreateBook/CreateBook";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { tableView, TABLE_VIEW } from "../../redux/actions";

export default function Dashboard() {
  const { tableViewGlobal } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [hovered, setHovered] = useState(0);
  const [hidden, setHidden] = useState(false);

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
              dispatch({ type: TABLE_VIEW, payload: "users" });
              setHovered(1);
            }}
            className={hovered === 1 && style.hovered}
          >
            <MdDashboardCustomize className={style.i} />
            <span className={style.title}>Dashboard</span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "users" });
              setHovered(2);
            }}
            className={hovered === 2 && style.hovered}
          >
            <FaUsers className={style.i} />
            <span className={style.title}>Usuarios</span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "orders" });
              setHovered(3);
            }}
            className={hovered === 3 && style.hovered}
          >
            <FaFileInvoiceDollar className={style.i} />
            <span className={style.title}>Órdenes</span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "books" });
              setHovered(4);
            }}
            className={hovered === 4 && style.hovered}
          >
            <ImBooks className={style.i} />
            <span className={style.title}>Libros</span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "addBook" });
              setHovered(5);
            }}
            className={hovered === 5 && style.hovered}
          >
            <FaBook className={style.i} />
            <span className={style.title}>Agregar un libro</span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "genres" });
              setHovered(6);
            }}
            className={hovered === 6 && style.hovered}
          >
            <MdCategory className={style.i} />
            <span className={style.title}>Categorías</span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "users" });
              setHovered(8);
            }}
            className={hovered === 8 && style.hovered}
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
            {tableViewGlobal === "users" && <PanelUsers />}
            {tableViewGlobal === "orders" && <PanelOrders />}
            {tableViewGlobal === "books" && <PanelBooks />}
            {tableViewGlobal === "addBook" && <CreateBook />}
            {tableViewGlobal === "genres" && <PanelGenres />}
          </div>
        </div>
      </div>
    </div>
  );
}
