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
import {
  BOOKS_SEARCH_ADMIN,
  CARTS_SEARCH_ADMIN,
  getAllBooks,
  getAllUsers,
  getCarts,
  TABLE_VIEW,
  USERS_SEARCH_ADMIN,
} from "../../redux/actions";
import templateAlert from "../../helpers/templateAlert";
import { templateAlertTopEnd } from "../../helpers/templateAlert";
import { useEffect } from "react";

export default function Dashboard() {
  const { tableViewGlobal, detail, usersFiltersAdmin, cartsFiltersAdmin, booksFiltersAdmin } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const history = useHistory();

  const [hidden, setHidden] = useState(false);
  const [searchValue, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim().length !== 0) {
      tableViewGlobal === "users" &&
        dispatch({ type: USERS_SEARCH_ADMIN, payload: searchValue });
      tableViewGlobal === "orders" &&
        dispatch({ type: CARTS_SEARCH_ADMIN, payload: searchValue });
      tableViewGlobal === "books" &&
        dispatch({ type: BOOKS_SEARCH_ADMIN, payload: searchValue });
    } else {
      templateAlert("El campo no puede estar vacío", null, "warning", 3000);
    }

    setSearch("")
    e.target.reset()
  };

  const handleClear = (e) => {
    e.preventDefault();
    tableViewGlobal === "users" && dispatch({ type: USERS_SEARCH_ADMIN, payload: [] });
    tableViewGlobal === "orders" && dispatch({ type: CARTS_SEARCH_ADMIN, payload: [] });
    tableViewGlobal === "books" && dispatch({ type: BOOKS_SEARCH_ADMIN, payload: [] });
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
          <div>

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
          </div>
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
              <form
                className={style.searchForm}
                onSubmit={(e) => handleSubmit(e)}
              >
                <input
                  className={style.searchFormInput}
                  type="text"
                  placeholder={"Buscar aquí"}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i class="fa-solid fa-magnifying-glass"></i>
              </form>
              <button
                className={style.searchBtn}
                onClick={(e) => handleClear(e)}
              >
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
    </div >
  );
}
