import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BOOKS_ORDER_ADMIN,
  BOOKS_SEARCH_ADMIN,
  getAllBooks,
  putStatus,
  PUT_STATUS,
  TABLE_VIEW,
} from "../../redux/actions";
import { useHistory } from "react-router-dom";

import {
  MdDescription,
  BiCategory,
  BiImage,
  BsFillPencilFill,
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineSortAscending,
  AiOutlineSortDescending,
  BsSortNumericDown,
  BsSortNumericUp,
} from "react-icons/all";
import Swal from "sweetalert2";
import templateAlert from "../../helpers/templateAlert";
import { templateAlertTopEnd } from "../../helpers/templateAlert";
import style from "./PanelBooks.module.css";
import Loader from "../../pages/Home/GIF_aparecer_BooksNook.gif";

export default function PanelBooks() {
  const { allBooks, putStatusBook, booksFiltersAdmin } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const history = useHistory();

  //------------------------------------------------------------------------

  useEffect(() => {
    dispatch(getAllBooks(booksFiltersAdmin));
  }, [putStatusBook, booksFiltersAdmin]);

  useEffect(() => {
    if (allBooks.messageError) {
      templateAlertTopEnd(2000, "error", allBooks.messageError);
      dispatch({ type: BOOKS_SEARCH_ADMIN, payload: [] });
    }
  }, [allBooks]);

  useEffect(() => {
    if (Object.keys(putStatusBook).length) {
      if (putStatusBook.messageError) {
        templateAlertTopEnd(2000, "error", putStatusBook.messageError);
      } else {
        templateAlertTopEnd(2000, "success", putStatusBook.message);
      }
      dispatch({ type: PUT_STATUS, payload: {} });
    }
  }, [putStatusBook]);
  //------------------------------------------------------------------------

  const handleImage = (image, name) => {
    Swal.fire({
      background: "#19191a",
      color: "#e1e1e1",
      imageUrl: image,
      imageWidth: 361,
      imageHeight: 554,
      imageAlt: `Cover of ${name}`,
    });
  };

  const handleClick = (e, id, name, visible) => {
    e.preventDefault();
    Swal.fire({
      title: visible
        ? `Estás a punto de ocultar el libro "${name}."`
        : `Estás a punto volver a mostrar el libro "${name}."`,
      width: 650,
      text: "¿Quieres confirmar este cambio?",
      icon: "warning",
      iconColor: "#355070",
      showCancelButton: true,
      background: "#19191a",
      color: "#e1e1e1",
      confirmButtonColor: "#355070",
      cancelButtonColor: "#B270A2",
      confirmButtonText: visible ? `¡Sí! Ocultar libro` : `¡Sí! Mostrar libro`,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(putStatus(id));
      }
    });
  };

  function goDetail(e, id, name) {
    e.preventDefault();
    Swal.fire({
      title: `Estás a punto de dirigirte al detalle del libro "${name}."`,
      width: 650,
      text: "¿Quieres confirmar esta acción?",
      icon: "warning",
      iconColor: "#355070",
      showCancelButton: true,
      background: "#19191a",
      color: "#e1e1e1",
      confirmButtonColor: "#355070",
      cancelButtonColor: "#B270A2",
      confirmButtonText: `¡Sí! Ir al detalle`,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push(`/detail/${id}`);
      }
    });
  }

  let totalBooks =
    allBooks.length &&
    allBooks.reduce((acc, el) => {
      return acc + el.stock;
    }, 0);

  function templateAlertDescription(title, text) {
    return Swal.fire({
      background: "#19191a",
      color: "#e1e1e1",
      title: title,
      html: text,
      customClass: {
        htmlContainer: style.swal_description,
      },
    });
  }

  return (
    <div className={style.panel_books}>
      {!allBooks.length ? (
        <img src={Loader} alt="Loader_Logo"></img>
      ) : (
        <div className={style.container}>
          <div className={style.table_container}>
            <div
              className={`${style.table_row} ${style.table_row_attributtes}`}
            >
              <span className={style.col0}>#</span>
              {/* <span className={style.col1}>Nombre</span> */}
              <span
                className={
                  booksFiltersAdmin.sort.slice(0, 3) === "nam"
                    ? `${style.col1} ${style.col_active}`
                    : style.col1
                }
                onClick={() =>
                  dispatch({
                    type: BOOKS_ORDER_ADMIN,
                    payload:
                      booksFiltersAdmin.sort === "name-A-Z"
                        ? "name-Z-A"
                        : "name-A-Z",
                  })
                }
              >
                <span>Nombre</span>
                {booksFiltersAdmin.sort === "name-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}
              </span>
              <span
                className={
                  booksFiltersAdmin.sort.slice(0, 3) === "aut"
                    ? `${style.col2} ${style.col_active}`
                    : style.col2
                }
                onClick={() =>
                  dispatch({
                    type: BOOKS_ORDER_ADMIN,
                    payload:
                      booksFiltersAdmin.sort === "author-A-Z"
                        ? "author-Z-A"
                        : "author-A-Z",
                  })
                }
              >
                <span>Autor</span>
                {booksFiltersAdmin.sort === "author-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}
              </span>
              <span
                className={
                  booksFiltersAdmin.sort.slice(0, 3) === "yea"
                    ? `${style.col3} ${style.col_active}`
                    : style.col3
                }
                onClick={() =>
                  dispatch({
                    type: BOOKS_ORDER_ADMIN,
                    payload:
                      booksFiltersAdmin.sort === "year-min-max"
                        ? "year-max-min"
                        : "year-min-max",
                  })
                }
              >
                <span>Año</span>
                {booksFiltersAdmin.sort === "year-min-max" ? (
                  <BsSortNumericDown className={style.i_order} />
                ) : (
                  <BsSortNumericUp className={style.i_order} />
                )}
              </span>
              <span className={style.col4}>Categorías</span>
              <span className={style.col5}>Portada</span>
              <span className={style.col6}>Descripción</span>
              <span
                className={
                  booksFiltersAdmin.sort.slice(0, 3) === "edi"
                    ? `${style.col7} ${style.col_active}`
                    : style.col7
                }
                onClick={() =>
                  dispatch({
                    type: BOOKS_ORDER_ADMIN,
                    payload:
                      booksFiltersAdmin.sort === "editorial-A-Z"
                        ? "editorial-Z-A"
                        : "editorial-A-Z",
                  })
                }
              >
                <span>Editorial</span>
                {booksFiltersAdmin.sort === "editorial-A-Z" ? (
                  <AiOutlineSortAscending className={style.i_order} />
                ) : (
                  <AiOutlineSortDescending className={style.i_order} />
                )}
              </span>
              <span
                className={
                  booksFiltersAdmin.sort.slice(0, 3) === "pri"
                    ? `${style.col8} ${style.col_active}`
                    : style.col8
                }
                onClick={() =>
                  dispatch({
                    type: BOOKS_ORDER_ADMIN,
                    payload:
                      booksFiltersAdmin.sort === "price-min-max"
                        ? "price-max-min"
                        : "price-min-max",
                  })
                }
              >
                <span>Precio</span>
                {booksFiltersAdmin.sort === "price-min-max" ? (
                  <BsSortNumericDown className={style.i_order} />
                ) : (
                  <BsSortNumericUp className={style.i_order} />
                )}
              </span>
              <span
                className={
                  booksFiltersAdmin.sort.slice(0, 3) === "sto"
                    ? `${style.col9} ${style.col_active}`
                    : style.col9
                }
                onClick={() =>
                  dispatch({
                    type: BOOKS_ORDER_ADMIN,
                    payload:
                      booksFiltersAdmin.sort === "stock-min-max"
                        ? "stock-max-min"
                        : "stock-min-max",
                  })
                }
              >
                <span>Stock</span>
                {booksFiltersAdmin.sort === "stock-min-max" ? (
                  <BsSortNumericDown className={style.i_order} />
                ) : (
                  <BsSortNumericUp className={style.i_order} />
                )}
              </span>
              <span className={style.col10}>Editar</span>
              <span className={style.col11}>Ocultar</span>
            </div>
            {allBooks.length &&
              allBooks.map((el, index) => (
                <div className={style.table_row} key={index}>
                  <span className={style.col0}>{index + 1}</span>
                  <span
                    className={style.col1}
                    onClick={(e) => goDetail(e, el.id, el.name)}
                  >
                    {el.name}
                  </span>
                  <span className={style.col2}>{el.author}</span>
                  <span className={style.col3}>{el.edition}</span>
                  <span className={style.col4}>
                    <span
                      onClick={() =>
                        templateAlert(
                          "Categorías",
                          el.Genres.map((ele) => ele.name).join(", ")
                        )
                      }
                    >
                      {el.Genres.map((ele) => ele.name).join(", ")}
                    </span>
                  </span>
                  <span className={style.col5}>
                    <button
                      className={style.btn}
                      onClick={() => handleImage(el.image, el.name)}
                    >
                      <BiImage />
                    </button>
                  </span>
                  <span className={style.col6}>
                    <button
                      className={style.btn}
                      onClick={() =>
                        templateAlertDescription("Descripción", el.description)
                      }
                    >
                      <MdDescription />
                    </button>
                  </span>
                  <span className={style.col7}>{el.editorial}</span>
                  <span className={style.col8}>{el.price}</span>
                  <span className={style.col9}>{el.stock}</span>
                  <span
                    onClick={() => {
                      dispatch({ type: TABLE_VIEW, payload: "addBook" });
                    }}
                    className={style.col10}
                  >
                    <BsFillPencilFill />
                  </span>
                  <span
                    className={style.col11}
                    onClick={(e) => handleClick(e, el.id, el.name, el.visible)}
                  >
                    {el.visible ? <AiFillEye /> : <AiFillEyeInvisible />}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
