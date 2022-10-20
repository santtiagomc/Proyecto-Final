import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  addBooks,
  getDetail,
  getGenres,
  GET_DETAIL,
  putBook,
  resetCreate,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./CreateBook.module.css";
import Swal from "sweetalert2";

function validation(input) {
  let errors = {};

  const regexDecimal = /^\d{1,3}(\.\d{1,2})?$/;
  const regexNotNumbers =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
  const regexUrl = /^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/;
  const regexName = /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9-() .,!*:;]{2,50}$/;
  const regexAutor = /^[a-zA-ZÀ-ÿ\u00f1\u00d1 .]{2,30}$/;

  if (input.name.length <= 1) {
    errors.name = "Mínimo 2 caracteres";
  } else if (input.name.length >= 50) {
    errors.name = "Máximo 50 caracteres";
  } else if (!input.name.match(regexName)) {
    errors.name =
      "Sólo puede contener letras, números y los siguientes caracteres: .,!*:-()";
  }
  if (!input.image.match(regexUrl)) {
    errors.image = "Ingresa url de una imagen";
  }

  if (input.author.length <= 1) {
    errors.author = "Mínimo 2 caracteres";
  } else if (!input.author.match(regexAutor)) {
    errors.author = "El autor sólo puede contener letras";
  }
  if (input.description.length <= 1) {
    errors.description = "Mínimo 2 caracteres";
  } else if (input.description.length > 2000) {
    errors.description = "Máximo 2000 caracteres";
  }

  if (input.price > 1000) {
    errors.price = "Precio máximo 1000";
  } else if (input.price <= 0) {
    errors.price = "Precio mínimo 0";
  } else if (!regexDecimal.test(input.price)) {
    errors.price = "El precio debe tener como máximo dos decimales";
  }
  if (input.stock < 0) {
    errors.stock = "El stock tiene que ser mayor o igual a 0";
  }

  if (input.editorial.length <= 1) {
    errors.editorial = "El campo editorial debe ser mayor a una letra";
  } else if (!input.editorial.match(regexNotNumbers)) {
    errors.editorial = "La editorial sólo puede contener letras";
  }

  if (!input.edition) {
    errors.edition = "El campo edición es requerido";
  } else if (input.edition < 1800) {
    errors.edition = "El año debe ser mayor a 1800";
  } else if (input.edition > 2023) {
    errors.edition = "El año debe ser menor a 2023";
  }
  return errors;
}

export default function CreateBook() {
  const dispatch = useDispatch();
  const history = useHistory();

  const detail = useSelector((state) => state.detail);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      dispatch(getDetail(params.id));
    }
    return () => {
      dispatch({ type: GET_DETAIL, payload: [] });
    };
  }, []);

  const { genres, create } = useSelector((state) => state);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    author: "",
    description: "",
    price: "",
    stock: "",
    editorial: "",
    edition: "",
    genre: [],
  });

  useEffect(() => {
    if (params.id) {
      if (Array.isArray(detail)) return;

      setInput({
        name: detail.name,
        image: detail.image,
        author: detail.author,
        description: detail.description,
        price: detail.price,
        stock: detail.stock,
        editorial: detail.editorial,
        edition: detail.edition,
        genre: detail.Genres.reduce((acc, el) => {
          acc.push(el.name);
          return acc;
        }, []),
      });
    }
  }, [detail]);

  function handleSelect(e) {
    if (input.genre.includes(e.target.value)) {
      Swal.fire({
        title: "La categoría seleccionada ya se encuentra en la lista",
        text: "Seleccione otra categoría",
        icon: "warning",
        timer: 4000,
      });
    } else {
      setInput({
        ...input,
        genre: [...input.genre, e.target.value],
      });
    }
  }

  const handleDelete = (e) => {
    setInput({
      ...input,
      genre: input.genre.filter((el) => el !== e),
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!params.id) {
      if (Object.keys(errors).length === 0) {
        dispatch(addBooks(input));
      } else {
        Swal.fire({
          title: "Todos los campos son requeridos",
          // text: "Faltan campos por llenar",
          icon: "info",
          timer: 4000,
        });
      }
    } else {
      if (Object.keys(errors).length === 0) {
        console.log(input);
        dispatch(putBook(params.id, input));
      } else {
        Swal.fire({
          title: "Todos los campos son requeridos",
          // text: "Faltan campos por llenar",
          icon: "info",
          timer: 4000,
        });
      }
    }
  }

  useEffect(() => {
    if (create.message) {
      Swal.fire({
        title: create.message,
        icon: "success",
      });
      dispatch(resetCreate());
      setInput({
        name: "",
        image: "",
        author: "",
        description: "",
        price: "",
        stock: "",
        editorial: "",
        edition: "",
        genre: [],
      });
      history.push("/");
    } else if (create.messageError) {
      Swal.fire({
        title: create.messageError,
        icon: "warning",
      });
      dispatch(resetCreate());
    }
  }, [create]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  useEffect(() => {
    if (!genres.length) dispatch(getGenres());
    setErrors(validation(input));
  }, [dispatch, input]);

  return (
    <>
      <div className={style.container}>
        <div className={style.containerForm}>
          <div>
            <h1> {params.id ? "Editar libro " : "Agregar Libro"} </h1>
          </div>
          <div className={style.formulario}>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <div className={style.incontainer}>
                <h3 className={style.h3}>Nombre</h3>
                <input
                  className={style.input}
                  type="text"
                  placeholder={params.id ? detail.name : "Nombre del libro"}
                  value={input.name.toLowerCase()}
                  name="name"
                  onChange={(e) => handleChange(e)}
                />
                {input.name && <p className={style.err}>{errors.name}</p>}
                {/* {errors.name ? (<p className={style.err}>{errors.name}</p>) : ""} */}
              </div>
              <div className={style.incontainer}>
                <h3 className={style.h3}>Portada</h3>
                <input
                  className={style.input}
                  type="url"
                  placeholder="Url portada"
                  value={input.image}
                  name="image"
                  onChange={(e) => handleChange(e)}
                />
                {input.image && <p className={style.err}>{errors.image}</p>}
              </div>
              <div className={style.incontainer}>
                <h3 className={style.h3}>Autor</h3>
                <input
                  className={style.input}
                  type="text"
                  placeholder="Nombre del Autor"
                  value={input.author}
                  name="author"
                  onChange={(e) => handleChange(e)}
                />
                {input.author && <p className={style.err}>{errors.author}</p>}
              </div>
              <div className={style.incontainer}>
                <h3 className={style.h3}>Precio</h3>
                <input
                  className={style.input}
                  type="number"
                  placeholder="Precio"
                  value={input.price}
                  name="price"
                  onChange={(e) => handleChange(e)}
                />
                {input.price && <p className={style.err}>{errors.price}</p>}
              </div>
              <div className={style.incontainer}>
                <h3 className={style.h3}>Stock</h3>
                <input
                  className={style.input}
                  type="number"
                  placeholder="Stock"
                  value={input.stock}
                  name="stock"
                  onChange={(e) => handleChange(e)}
                />
                {input.stock && <p className={style.err}>{errors.stock}</p>}
              </div>
              <div className={style.incontainer}>
                <h3 className={style.h3}>Editorial</h3>
                <input
                  className={style.input}
                  type="text"
                  placeholder="Nombre de la editorial"
                  value={input.editorial}
                  name="editorial"
                  onChange={(e) => handleChange(e)}
                />
                {input.editorial && (
                  <p className={style.err}>{errors.editorial}</p>
                )}
              </div>
              <div className={style.incontainer}>
                <h3 className={style.h3}>Año de edición</h3>
                <input
                  className={style.input}
                  type="number"
                  placeholder="Año"
                  value={input.edition}
                  name="edition"
                  onChange={(e) => handleChange(e)}
                />
                {input.edition && <p className={style.err}>{errors.edition}</p>}
              </div>
              <div className={style.incontainer}>
                <h3 className={style.h3}>Descripción</h3>
                <textarea
                  className={style.textArea}
                  name="description"
                  id=""
                  cols="30"
                  rows="100"
                  type="text"
                  placeholder="Descripción del libro"
                  value={input.description}
                  onChange={(e) => handleChange(e)}
                ></textarea>
                {input.description && (
                  <p className={style.err}>{errors.description}</p>
                )}
              </div>
              <div className={style.incontainer}>
                <h3 className={style.h3}>Categorías</h3>
                <select
                  value="0"
                  onChange={(e) => handleSelect(e)}
                  className={style.selectGenre}
                >
                  <option selected disabled value="0">
                    Categorías
                  </option>
                  {genres.map((el) => {
                    return (
                      <option key={el} value={el}>
                        {" "}
                        {el}{" "}
                      </option>
                    );
                  })}
                </select>
                {/* {errors.genre && (<p className={style.err}>{errors.genre}</p>)} */}
              </div>

              <div className={style.genreContain}>
                {input.genre.map((c) => {
                  return (
                    <div key={c} className={style.divGenre}>
                      <ul>
                        <li>{c}</li>
                        <button
                          className={style.btnx}
                          onClick={() => handleDelete(c)}
                        >
                          X
                        </button>
                      </ul>
                    </div>
                  );
                })}
              </div>
              {
                <div>
                  <button className={style.btn} type="submit">
                    {params.id ? "Completar edición" : "Crear"}
                  </button>
                  <Link to="/">
                    <button className={style.btn}>Volver</button>
                  </Link>
                </div>
              }
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
