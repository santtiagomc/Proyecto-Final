import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Review.module.css";
import {
  deleteReviews,
  getDetail,
  postReviews,
  POST_REVIEWS,
} from "../../redux/actions";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { RiForbidLine } from "react-icons/ri";

export default function Review({ id }) {
  const { user, createReview, detail, userDb } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [addReviewActive, setAddReviewActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [input, setInput] = useState({
    title: "",
    description: "",
    rating: 0,
    UserId: user ? user.uid : "",
    BookId: id,
  });

  function validate(input) {
    let error = {};

    const regexText = /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9-() .,!*:;]{2,2000}$/;

    if (input.title.length <= 1) {
      error.title = "Mínimo 2 caracteres";
    } else if (input.title.length > 80) {
      error.title = "Máximo 80 caracteres";
    } else if (!input.title.match(regexText)) {
      error.title =
        "Sólo puede contener letras, números y los siguientes caracteres: .,!*:-()";
    }

    if (input.description.length <= 1) {
      error.description = "Mínimo 2 caracteres";
    } else if (input.description.length > 1500) {
      error.description = "Máximo 1500 caracteres";
    }

    if (input.rating === 0) {
      error.rating = "Debes darle un puntaje a tu reseña";
    }

    setErrors(error);
  }

  useEffect(() => {
    if (!detail) return;
    validate(input);
  }, [input, detail]);

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

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleRating(value) {
    setInput({ ...input, rating: Number(value) });
  }

  function onSubmit(e) {
    e.preventDefault();
    dispatch(postReviews(input));

    setButtonDisabled(true);
    setTimeout(function () {
      setButtonDisabled(false);
    }, 2000);
  }

  function handleDelete(e) {
    e.preventDefault();
    Swal.fire({
      title: "¡Cuidado! Estás a punto de borrar tu reseña.",
      width: 650,
      text: "¿Quieres borrar tu reseña? Esto no podrá deshacerse.",
      icon: "warning",
      iconColor: "#355070",
      showCancelButton: true,
      background: "#19191a",
      color: "#e1e1e1",
      confirmButtonColor: "#355070",
      cancelButtonColor: "#B270A2",
      confirmButtonText: "¡Si! Borrar reseña",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReviews({ UserId: user.uid, BookId: id }));

        swalAlert(
          3000,
          "success",
          "Has eliminado tu reseña, puedes agregar una nueva!"
        );
      }
    });
  }

  function handleUserBanned(e) {
    e.preventDefault();
    Swal.fire({
      title: "Tu usuario se encuentra baneado",
      width: 600,
      text: "Los usuarios baneados no pueden añadir reseñas",
      icon: "warning",
      background: "#19191a",
      color: "#e1e1e1",
      border: "none",
      // confirmButtonColor: "#45B7B7",
      confirmButtonColor: "#37AA9C",
      confirmButtonText: "Aceptar",
    });
  }

  function handleAdminDelete(userId) {
    Swal.fire({
      title: "¡Cuidado! Estás a punto de borrar una reseña.",
      width: 650,
      text: "¿Quieres borrar esta reseña? Esto no podrá deshacerse.",
      icon: "warning",
      iconColor: "#355070",
      showCancelButton: true,
      background: "#19191a",
      color: "#e1e1e1",
      confirmButtonColor: "#355070",
      cancelButtonColor: "#B270A2",
      confirmButtonText: "¡Si! Borrar reseña",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReviews({ UserId: userId, BookId: id }));

        swalAlert(3000, "success", "La reseña ha sido eliminada con éxito");
      }
    });
  }

  useEffect(() => {
    if (Array.isArray(createReview)) return;
    if (createReview.messageError) {
      swalAlert(2000, "error", createReview.messageError);
      dispatch({ type: POST_REVIEWS, payload: [] });
    } else if (createReview.message) {
      swalAlert(2000, "success", createReview.message);

      setInput({
        title: "",
        description: "",
        rating: 0,
        UserId: user ? user.uid : "",
        BookId: id,
      });
      dispatch({ type: POST_REVIEWS, payload: [] });
      dispatch(getDetail(id));
    }
  }, [dispatch, createReview, id, user]);

  return (
    <div className={`container ${style.reviews_container}`}>
      {/* <h1 className={style.container_title}>Reseñas</h1> */}
      {!user ? (
        <>
          <h1 className={style.container_title}>Reseñas</h1>
          <Link to="/login" className={style.see_form}>
            <p>Inicia sesión para añadir una reseña</p>
            <i className="fa-solid fa-user"></i>
          </Link>
        </>
      ) : userDb && userDb.status === "Baneado" ? (
        <>
          <h1 className={style.container_title}>Reseñas</h1>
          <button
            className={style.baneado}
            onClick={(e) => handleUserBanned(e)}
          >
            <p className={style.baneadoText}>No es posible añadir una reseña</p>
            <RiForbidLine className={style.iconForb} />
          </button>
        </>
      ) : userDb && (userDb.role === "Admin++" || userDb.role === "Admin") ? (
        <>
          <h1 className={style.container_title}>Reseñas</h1>
          <hr></hr>
          {detail.Reviews.length
            ? detail.Reviews.map((review, index) => (
                <div className={style.single_review} key={index}>
                  {review.User && (
                    <h6 className={style.user_single_review}>
                      {review.User.fullName}
                    </h6>
                  )}
                  <div className={style.header_single_review}>
                    <h3 className={style.title_single_review}>
                      {" "}
                      {review.title}{" "}
                    </h3>
                    <div className={style.stars_single_review}>
                      {Array(review.rating)
                        .fill(1)
                        .map((e, index) => (
                          <div className={style.star_single_review} key={index}>
                            <i className={`fa-solid fa-star`}></i>
                          </div>
                        ))}
                    </div>
                  </div>
                  <p className={style.description_single_review}>
                    {" "}
                    {review.description}{" "}
                  </p>

                  <div
                    className={style.delete_single_review}
                    onClick={() => handleAdminDelete(review.User.id)}
                  >
                    {/* <i className="fa-solid fa-square-xmark"></i> */}
                    <span>Eliminar reseña</span>
                    <i className="fa-solid fa-square-xmark"></i>
                  </div>

                  <hr></hr>
                </div>
              ))
            : ""}
        </>
      ) : !addReviewActive ? (
        <span
          className={style.see_form}
          onClick={() => setAddReviewActive(true)}
        >
          <p>Añadir reseña</p>
          <i className="fa-solid fa-arrow-down"></i>
        </span>
      ) : (
        <div>
          <span
            className={style.see_form}
            onClick={() => setAddReviewActive(false)}
          >
            <p>Ocultar formulario</p>
            <i className="fa-solid fa-arrow-up"></i>
          </span>
          <form className="row" onSubmit={onSubmit}>
            <div className="col-10 mb-3">
              <label for="title" className="form-label">
                Título*
              </label>
              <input
                className={`form-control ${
                  !input.title ? "" : errors.title ? "is-invalid" : "is-valid"
                }`}
                type="text"
                name="title"
                id="title"
                placeholder="Agregue un título a su reseña"
                value={input.title}
                onChange={handleChange}
              />
              {input.title && (
                <div className="invalid-feedback">{errors.title}</div>
              )}
            </div>

            <div className="col-2 mb-3">
              <label for="rating" className={` ${style.label_rating}`}>
                Rating*
              </label>
              <div id="rating" className={`col-3 ${style.stars}`}>
                <div className={style.star}>
                  <i
                    className={
                      input.rating >= 1
                        ? `fa-solid fa-star`
                        : `fa-regular fa-star`
                    }
                    onClick={() => handleRating(1)}
                  ></i>
                </div>

                <div className={style.star}>
                  <i
                    className={
                      input.rating >= 2
                        ? `fa-solid fa-star`
                        : `fa-regular fa-star`
                    }
                    onClick={() => handleRating(2)}
                  ></i>
                </div>

                <div className={style.star}>
                  <i
                    className={
                      input.rating >= 3
                        ? `fa-solid fa-star`
                        : `fa-regular fa-star`
                    }
                    onClick={() => handleRating(3)}
                  ></i>
                </div>

                <div className={style.star}>
                  <i
                    className={
                      input.rating >= 4
                        ? `fa-solid fa-star`
                        : `fa-regular fa-star`
                    }
                    onClick={() => handleRating(4)}
                  ></i>
                </div>

                <div className={style.star}>
                  <i
                    className={
                      input.rating >= 5
                        ? `fa-solid fa-star`
                        : `fa-regular fa-star`
                    }
                    onClick={() => handleRating(5)}
                  ></i>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label for="description" className="form-label">
                Descripción*
              </label>
              <textarea
                rows="11"
                type="text"
                name="description"
                id="description"
                className={`form-control ${
                  !input.description
                    ? ""
                    : errors.description
                    ? "is-invalid"
                    : "is-valid"
                }`}
                placeholder="Agregue su reseña"
                value={input.description}
                onChange={handleChange}
              />
              {input.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>

            <div className="mb-3">
              <button
                className="btn btn-primary col-1"
                disabled={
                  Object.keys(errors).length || buttonDisabled ? true : false
                }
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      )}

      {user ? (
        userDb &&
        (userDb.role === "Usuario" || userDb.status === "Baneado") && (
          <>
            <hr></hr>
            {detail.Reviews.length
              ? detail.Reviews.map((review, index) => (
                  <div className={style.single_review} key={index}>
                    {review.User && (
                      <h6 className={style.user_single_review}>
                        {review.User.fullName}
                      </h6>
                    )}
                    <div className={style.header_single_review}>
                      <h3 className={style.title_single_review}>
                        {" "}
                        {review.title}{" "}
                      </h3>
                      <div className={style.stars_single_review}>
                        {Array(review.rating)
                          .fill(1)
                          .map((e, index) => (
                            <div
                              className={style.star_single_review}
                              key={index}
                            >
                              <i className={`fa-solid fa-star`}></i>
                            </div>
                          ))}
                      </div>
                    </div>
                    <p className={style.description_single_review}>
                      {" "}
                      {review.description}{" "}
                    </p>
                    {user && review.User?.id === user.uid && (
                      <div
                        className={style.delete_single_review}
                        onClick={handleDelete}
                      >
                        {/* <i className="fa-solid fa-square-xmark"></i> */}
                        <span>Eliminar reseña</span>
                        <i className="fa-solid fa-square-xmark"></i>
                      </div>
                    )}
                    <hr></hr>
                  </div>
                ))
              : ""}
          </>
        )
      ) : (
        <>
          <hr></hr>
          {detail.Reviews.length
            ? detail.Reviews.map((review, index) => (
                <div className={style.single_review} key={index}>
                  {review.User && (
                    <h6 className={style.user_single_review}>
                      {review.User.fullName}
                    </h6>
                  )}
                  <div className={style.header_single_review}>
                    <h3 className={style.title_single_review}>
                      {" "}
                      {review.title}{" "}
                    </h3>
                    <div className={style.stars_single_review}>
                      {Array(review.rating)
                        .fill(1)
                        .map((e, index) => (
                          <div className={style.star_single_review} key={index}>
                            <i className={`fa-solid fa-star`}></i>
                          </div>
                        ))}
                    </div>
                  </div>
                  <p className={style.description_single_review}>
                    {" "}
                    {review.description}{" "}
                  </p>
                  {user && review.User?.id === user.uid && (
                    <div
                      className={style.delete_single_review}
                      onClick={handleDelete}
                    >
                      {/* <i className="fa-solid fa-square-xmark"></i> */}
                      <span>Eliminar reseña</span>
                      <i className="fa-solid fa-square-xmark"></i>
                    </div>
                  )}
                  <hr></hr>
                </div>
              ))
            : ""}
        </>
      )}
    </div>
  );
}
