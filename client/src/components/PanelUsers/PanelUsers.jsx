import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  putUser,
  PUT_USER,
  USERS_ORDER_ADMIN,
  USERS_SEARCH_ADMIN,
} from "../../redux/actions";
import style from "./PanelUsers.module.css";
import Loader from "../../pages/Home/GIF_aparecer_BooksNook.gif";
import {
  AiFillEdit,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/all";
import Swal from "sweetalert2";
import { templateAlertTopEnd } from "../../helpers/templateAlert";

export default function PanelUsers() {
  const { allUsers, putUserResponse, usersFiltersAdmin, userDb } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(usersFiltersAdmin));
  }, [putUserResponse, usersFiltersAdmin]);

  useEffect(() => {
    if (allUsers.messageError) {
      templateAlertTopEnd(2000, "error", allUsers.messageError);
      dispatch({ type: USERS_SEARCH_ADMIN, payload: [] });
    }
  }, [dispatch, allUsers]);

  useEffect(() => {
    if (!Array.isArray(putUserResponse)) {
      if (putUserResponse.messageError) {
        templateAlertTopEnd(2000, "error", putUserResponse.messageError);
      } else {
        templateAlertTopEnd(2000, "success", putUserResponse.message);
      }
      dispatch({ type: PUT_USER, payload: [] });
    }
  }, [dispatch, putUserResponse]);

  function handleRole(e, id, fullName, role) {
    e.preventDefault();
    Swal.fire({
      title:
        role === "Admin"
          ? `Estás a punto de quitar el rol de Admin al usuario: ${fullName}.`
          : `Estás a punto de asignar el rol de Admin al usuario: ${fullName}.`,
      width: 650,
      text: "¿Quieres confirmar este cambio?",
      icon: "warning",
      iconColor: "#355070",
      showCancelButton: true,
      background: "#19191a",
      color: "#e1e1e1",
      confirmButtonColor: "#355070",
      cancelButtonColor: "#B270A2",
      confirmButtonText: "¡Si! Cambiar rol",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(putUser({ id: id, role: true }));
      }
    });
  }

  function handleStatus(e, id, fullName, status) {
    e.preventDefault();
    Swal.fire({
      title:
        status === "Activo"
          ? `Estás a punto de banear al usuario: ${fullName}.`
          : `Estás a punto de desbanear al usuario: ${fullName}.`,
      width: 650,
      text: "¿Quieres confirmar este cambio?",
      icon: "warning",
      iconColor: "#355070",
      showCancelButton: true,
      background: "#19191a",
      color: "#e1e1e1",
      confirmButtonColor: "#355070",
      cancelButtonColor: "#B270A2",
      confirmButtonText: "¡Si! Cambiar estado",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(putUser({ id: id, status: true }));
      }
    });
  }

  return (
    <div className={style.panel_users}>
      {allUsers && !allUsers.length ? (
        <img src={Loader} alt="Loader_Logo"></img>
      ) : (
        <div className={style.container}>
          <div className={style.table_container}>
            <div
              className={`${style.table_row} ${style.table_row_attributtes}`}
            >
              <span
                className={
                  usersFiltersAdmin.sort.slice(0, 3) === "rol"
                    ? `${style.col1} ${style.col_active}`
                    : style.col1
                }
                onClick={() =>
                  dispatch({
                    type: USERS_ORDER_ADMIN,
                    payload:
                      usersFiltersAdmin.sort === "role-A-Z"
                        ? "role-Z-A"
                        : "role-A-Z",
                  })
                }
              >
                <span>Rol</span>
                {usersFiltersAdmin.sort === "role-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}
              </span>
              <span
                className={
                  usersFiltersAdmin.sort.slice(0, 3) === "nam"
                    ? `${style.col2} ${style.col_active}`
                    : style.col2
                }
                onClick={() =>
                  dispatch({
                    type: USERS_ORDER_ADMIN,
                    payload:
                      usersFiltersAdmin.sort === "name-A-Z"
                        ? "name-Z-A"
                        : "name-A-Z",
                  })
                }
              >
                <span>Nombre</span>
                {usersFiltersAdmin.sort === "name-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}
              </span>
              <span
                className={
                  usersFiltersAdmin.sort.slice(0, 3) === "ema"
                    ? `${style.col3} ${style.col_active}`
                    : style.col3
                }
                onClick={() =>
                  dispatch({
                    type: USERS_ORDER_ADMIN,
                    payload:
                      usersFiltersAdmin.sort === "email-A-Z"
                        ? "email-Z-A"
                        : "email-A-Z",
                  })
                }
              >
                <span>Correo</span>
                {usersFiltersAdmin.sort === "email-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}
              </span>
              <span
                className={
                  usersFiltersAdmin.sort.slice(0, 3) === "sta"
                    ? `${style.col4} ${style.col_active}`
                    : style.col4
                }
                onClick={() =>
                  dispatch({
                    type: USERS_ORDER_ADMIN,
                    payload:
                      usersFiltersAdmin.sort === "status-A-Z"
                        ? "status-Z-A"
                        : "status-A-Z",
                  })
                }
              >
                <span>Estado</span>
                {usersFiltersAdmin.sort === "status-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}
              </span>
              <span className={style.col5}> Provincia </span>
              <span className={style.col6}> Ciudad </span>
              <span className={style.col7}> Dirección </span>
              <span className={style.col8}> Código postal </span>
            </div>
            {allUsers.length &&
              allUsers.map((user) => (
                <div key={user.id} className={style.table_row}>
                  <span className={style.col1}>
                    <span className={style.text}>{user.role}</span>
                    {userDb.role === "Admin++" ?
                      user.role !== "Admin++" && user.status === "Activo"
                        ?
                        <AiFillEdit
                          className={style.icon}
                          onClick={(e, id, fullName, role) =>
                            handleRole(e, user.id, user.fullName, user.role)
                          }
                          value={user.id}
                        />
                        : null
                      : userDb.role === "Admin" && userDb.id !== user.id && user.status === "Activo" && user.role !== "Admin++"
                        ? <AiFillEdit
                          className={style.icon}
                          onClick={(e, id, fullName, role) =>
                            handleRole(e, user.id, user.fullName, user.role)
                          }
                          value={user.id}
                        />
                        : null
                    }
                  </span>
                  <span className={user.id === userDb.id ? `${style.col2} ${style.current}` : style.col2}>{user.fullName}</span>
                  <span className={style.col3}>{user.email}</span>
                  <span className={style.col4}>
                    <span className={style.text}>{user.status}</span>
                    {
                      user.role === "Usuario"
                        ? <AiFillEdit
                          className={style.icon}
                          onClick={(e, id, fullName, status) =>
                            handleStatus(e, user.id, user.fullName, user.status)
                          }
                          value={user.id}
                        />
                        : null
                    }
                  </span>
                  <span className={style.col5}>{user.province}</span>
                  <span className={style.col6}>{user.city}</span>
                  <span className={style.col7}>{user.address}</span>
                  <span className={style.col8}>{user.zipCode}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
