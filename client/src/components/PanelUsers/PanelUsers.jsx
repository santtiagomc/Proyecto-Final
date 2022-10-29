import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, putUser, PUT_USER } from "../../redux/actions";
import style from "./PanelUsers.module.css";
import Loader from "../../pages/Home/GIF_aparecer_BooksNook.gif"
import { AiFillEdit } from "react-icons/ai";
import Swal from "sweetalert2";

export default function PanelUsers() {
  const { allUsers, putUserResponse } = useSelector(state => state)
  const dispatch = useDispatch()

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
    dispatch(getAllUsers())
  }, [putUserResponse])

  useEffect(() => {
    if (!Array.isArray(putUserResponse)) {
      if (putUserResponse.messageError) {

        swalAlert(2000, "error", putUserResponse.messageError)
      } else {
        swalAlert(2000, "success", putUserResponse.message)
      }
      dispatch({ type: PUT_USER, payload: [] })
    }
  }, [putUserResponse])

  function handleRole(e, id, fullName, role) {
    e.preventDefault()
    Swal.fire({
      title: role === "Administrador" ? `Estás a punto de quitar el rol de ADMIN al usuario: ${fullName}.` : `Estás a punto de dar rol de ADMIN al usuario: ${fullName}.`,
      width: 650,
      text: "¿Quieres confirmar este cambio?",
      icon: 'warning',
      iconColor: "#355070",
      showCancelButton: true,
      background: "#19191a",
      color: "#e1e1e1",
      confirmButtonColor: '#355070',
      cancelButtonColor: '#B270A2',
      confirmButtonText: '¡Si! Cambiar rol',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(putUser({ id: id, role: true }));
      }
    })
  }

  function handleStatus(e, id, fullName, status) {
    e.preventDefault()
    Swal.fire({
      title: status === "Activo" ? `Estás a punto de banear al usuario: ${fullName}.` : `Estás a punto de desbanear al usuario: ${fullName}.`,
      width: 650,
      text: "¿Quieres confirmar este cambio?",
      icon: 'warning',
      iconColor: "#355070",
      showCancelButton: true,
      background: "#19191a",
      color: "#e1e1e1",
      confirmButtonColor: '#355070',
      cancelButtonColor: '#B270A2',
      confirmButtonText: '¡Si! Cambiar estado',
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(putUser({ id: id, status: true }));
      }
    })
  }

  return (
    <div className={style.panel_users}>
      {!allUsers.length
        ? <img src={Loader} alt="Loader_Logo"></img>
        :
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
            {allUsers.length && allUsers.map(user => (
              <div className={style.table_row}>
                <span className={style.col1}>
                  <span className={style.text}>{user.role}</span>
                  <AiFillEdit className={style.icon} onClick={(e, id, fullName, role) => handleRole(e, user.id, user.fullName, user.role)} value={user.id} />
                </span>
                <span className={style.col2}>{user.fullName}</span>
                <span className={style.col3}>{user.email}</span>
                <span className={style.col4}>
                  <span className={style.text}>{user.status}</span>
                  <AiFillEdit className={style.icon} onClick={(e, id, fullName, status) => handleStatus(e, user.id, user.fullName, user.status)} value={user.id} />
                </span>
                <span className={style.col5}>{user.province}</span>
                <span className={style.col6}>{user.city}</span>
                <span className={style.col7}>{user.address}</span>
                <span className={style.col8}>{user.zipCode}</span>
              </div>
            ))}
          </div>
        </div>
      }
    </div>

  );
}
