import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  putUser,
  PUT_USER,
  USERS_ORDER_ADMIN,
} from "../../redux/actions";
import style from "./PanelUsers.module.css";
import Loader from "../../pages/Home/GIF_aparecer_BooksNook.gif";
import {
  AiFillEdit,
  BiDownArrow,
  BiUpArrow,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/all";
import Swal from "sweetalert2";
import templateAlert from "../../helpers/templateAlert";

export default function PanelUsers() {
  const { allUsers, putUserResponse, usersOrderAdmin } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  console.log(usersOrderAdmin);
  function swalAlert(timer, icon, message) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: icon,
      title: message,
    });
  }

  useEffect(() => {
    dispatch(getAllUsers(usersOrderAdmin));
  }, [putUserResponse, usersOrderAdmin]);

  useEffect(() => {
    if (allUsers.messageError) {
      templateAlert(allUsers.messageError, null, "error", 2000);
      dispatch(getAllUsers(usersOrderAdmin));
    }
  }, [allUsers]);

  useEffect(() => {
    if (!Array.isArray(putUserResponse)) {
      if (putUserResponse.messageError) {
        swalAlert(2000, "error", putUserResponse.messageError);
      } else {
        swalAlert(2000, "success", putUserResponse.message);
      }
      dispatch({ type: PUT_USER, payload: [] });
    }
  }, [putUserResponse]);

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
      {!allUsers.length ? (
        <img src={Loader} alt="Loader_Logo"></img>
      ) : (
        <div className={style.container}>
          <div className={style.table_container}>
            <div
              className={`${style.table_row} ${style.table_row_attributtes}`}
            >
              <span
                className={
                  usersOrderAdmin.slice(0, 3) === "rol"
                    ? `${style.col1} ${style.col_active}`
                    : style.col1
                }
                onClick={() =>
                  dispatch({
                    type: USERS_ORDER_ADMIN,
                    payload:
                      usersOrderAdmin === "role-A-Z" ? "role-Z-A" : "role-A-Z",
                  })
                }
              >
                <span>Rol</span>
                {usersOrderAdmin === "role-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}
              </span>
              <span
                className={
                  usersOrderAdmin.slice(0, 3) === "nam"
                    ? `${style.col2} ${style.col_active}`
                    : style.col2
                }
                onClick={() =>
                  dispatch({
                    type: USERS_ORDER_ADMIN,
                    payload:
                      usersOrderAdmin === "name-A-Z" ? "name-Z-A" : "name-A-Z",
                  })
                }
              >
                <span>Nombre</span>
                {usersOrderAdmin === "name-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}
              </span>
              <span
                className={
                  usersOrderAdmin.slice(0, 3) === "ema"
                    ? `${style.col3} ${style.col_active}`
                    : style.col3
                }
                onClick={() =>
                  dispatch({
                    type: USERS_ORDER_ADMIN,
                    payload:
                      usersOrderAdmin === "email-A-Z"
                        ? "email-Z-A"
                        : "email-A-Z",
                  })
                }
              >
                <span>Correo</span>
                {usersOrderAdmin === "email-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}
              </span>
              <span
                className={
                  usersOrderAdmin.slice(0, 3) === "sta"
                    ? `${style.col4} ${style.col_active}`
                    : style.col4
                }
                onClick={() =>
                  dispatch({
                    type: USERS_ORDER_ADMIN,
                    payload:
                      usersOrderAdmin === "status-A-Z"
                        ? "status-Z-A"
                        : "status-A-Z",
                  })
                }
              >
                <span>Estado</span>
                {usersOrderAdmin === "status-A-Z" ? (
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
                <div className={style.table_row}>
                  <span className={style.col1}>
                    <span className={style.text}>{user.role}</span>
                    <AiFillEdit
                      className={style.icon}
                      onClick={(e, id, fullName, role) =>
                        handleRole(e, user.id, user.fullName, user.role)
                      }
                      value={user.id}
                    />
                  </span>
                  <span className={style.col2}>{user.fullName}</span>
                  <span className={style.col3}>{user.email}</span>
                  <span className={style.col4}>
                    <span className={style.text}>{user.status}</span>
                    <AiFillEdit
                      className={style.icon}
                      onClick={(e, id, fullName, status) =>
                        handleStatus(e, user.id, user.fullName, user.status)
                      }
                      value={user.id}
                    />
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
