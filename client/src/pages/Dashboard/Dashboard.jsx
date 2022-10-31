import React, { useState } from "react";
import style from "./Dashboard.module.css";
import PanelUsers from "../../components/PanelUsers/PanelUsers";
import PanelBooks from "../../components/PanelBooks/PanelBooks";
import PanelOrders from "../../components/PanelOrders/PanelOrders";
import PanelGenres from "../../components/PanelGenres/PanelGenres";
import {
  FaBook,
  ImBooks,
  MdCategory,
  FaUsers,
  FaFileInvoiceDollar,
  MdDashboardCustomize,
  MdClear,
} from "react-icons/all";

import { useHistory } from "react-router-dom";
import CreateBook from "../CreateBook/CreateBook";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, TABLE_VIEW } from "../../redux/actions";
import templateAlert from "../../helpers/templateAlert";

export default function Dashboard() {
  const { tableViewGlobal, detail } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const [hidden, setHidden] = useState(false);
  const [searchValue, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim().length !== 0) {
      tableViewGlobal === "users" && console.log("xd");
      tableViewGlobal === "orders" && console.log("xd");
      tableViewGlobal === "books" && dispatch(getAllBooks(searchValue));
    } else {
      templateAlert("El campo no puede estar vacío", null, "warning", 3000);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    tableViewGlobal === "users" && console.log("xd");
    tableViewGlobal === "orders" && console.log("xd");
    tableViewGlobal === "books" && dispatch(getAllBooks());
  };

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
              dispatch({ type: TABLE_VIEW, payload: "dashboard" });
            }}
            className={tableViewGlobal === "dashboard" && style.hovered}
          >
            <MdDashboardCustomize className={style.i} />
            <span className={style.title}>Dashboard</span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "users" });
            }}
            className={tableViewGlobal === "users" && style.hovered}
          >
            <FaUsers className={style.i} />
            <span className={style.title}>Usuarios</span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "orders" });
            }}
            className={tableViewGlobal === "orders" && style.hovered}
          >
            <FaFileInvoiceDollar className={style.i} />
            <span className={style.title}>Órdenes</span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "books" });
            }}
            className={tableViewGlobal === "books" && style.hovered}
          >
            <ImBooks className={style.i} />
            <span className={style.title}>Libros</span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "addBook" });
            }}
            className={tableViewGlobal === "addBook" && style.hovered}
          >
            <FaBook className={style.i} />
            <span className={style.title}>
              {detail.name ? "Editar libro" : "Agregar un libro"}
            </span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "genres" });
            }}
            className={tableViewGlobal === "genres" && style.hovered}
          >
            <MdCategory className={style.i} />
            <span className={style.title}>Categorías</span>
          </li>
          <li
            onClick={() => {
              dispatch({ type: TABLE_VIEW, payload: "logOff" });
            }}
            className={tableViewGlobal === "logOff" && style.hovered}
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
              <form onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="text"
                  placeholder={"Buscar aquí"}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i class="fa-solid fa-magnifying-glass"></i>
              </form>
              <button onClick={(e) => handleClear(e)}>
                <MdClear className={style.clear} />
              </button>
            </div>

            <div className={style.logo}></div>
          </div>

          <div>
            {tableViewGlobal === "dashboard" && <PanelUsers />}
            {tableViewGlobal === "users" && <PanelUsers />}
            {tableViewGlobal === "orders" && <PanelOrders />}
            {tableViewGlobal === "books" && <PanelBooks />}
            {tableViewGlobal === "addBook" && <CreateBook />}
            {tableViewGlobal === "genres" && <PanelGenres />}
            {tableViewGlobal === "logOff" && <PanelGenres />}
          </div>
        </div>
      </div>
    </div>
  );
}
