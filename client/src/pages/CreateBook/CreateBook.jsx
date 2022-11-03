import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import {
  addBooks,
  EDIT_ID,
  getDetail,
  getGenres,
  GET_DETAIL,
  putBook,
  resetCreate,
  TABLE_VIEW,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  BiErrorAlt,
  BsFillImageFill,
  AiFillEyeInvisible,
  AiFillEye,
  TiDeleteOutline,
} from "react-icons/all";

import { uploadFile } from "../../firebase/firebase";

import style from "./CreateBook.module.css";
import Swal from "sweetalert2";
import templateAlert from "../../helpers/templateAlert";

function validation(input) {
  let errors = {};

  const regexDecimal = /^\d{1,3}(\.\d{1,2})?$/;
  const regexNotNumbers =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
  const regexOnlyNumbers = RegExp(/^\d+$/);
  const regexName = /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9-() .,!:;]{2,100}$/;
  const regexAutor =
    /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

  if (input.name.length < 2) {
    errors.name = "Mínimo 2 caracteres";
  } else if (input.name.length >= 100) {
    errors.name = "Máximo 100 caracteres";
  } else if (!input.name.match(regexName)) {
    errors.name =
      "Sólo puede contener letras, números y los siguientes caracteres: .,!:-()";
  }
  if (!input.image) {
    errors.image = "Ingresar una imagen es obligatorio";
  }

  if (input.author.length <= 1) {
    errors.author = "Mínimo 2 caracteres";
  } else if (!input.author.match(regexAutor)) {
    errors.author = "El autor sólo puede contener letras";
  } else if (input.author.length > 50) {
    errors.author = "Máximo 50 caracteres";
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
    errors.stock = "El stock no puede ser menor a 0";
  } else if (input.stock > 1000) {
    errors.stock = "Stock máximo 1000";
  } else if (!regexOnlyNumbers.test(input.stock)) {
    errors.stock = "El campo solo admite números";
  }

  if (input.editorial.length <= 1) {
    errors.editorial = "Mínimo 2 caracteres";
  } else if (!input.editorial.match(regexName)) {
    errors.editorial =
      "La editorial sólo puede contener letras y caracteres especiales";
  } else if (input.editorial.length > 50) {
    errors.editorial = "Máximo 50 caracteres";
  }

  if (!input.edition) {
    errors.edition = "El campo edición es requerido";
  } else if (input.edition < 1800) {
    errors.edition = "El año debe ser mayor a 1800";
  } else if (input.edition > 2023) {
    errors.edition = "El año debe ser menor a 2023";
  } else if (!regexOnlyNumbers.test(input.edition)) {
    errors.edition = "El campo solo admite números";
  }

  return errors;
}

export default function CreateBook() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const query = location.search.slice(4);

  const { genres, create, edit_id, detail } = useSelector((state) => state);
  let [buttonDisabled, setButtonDisabled] = useState(false);
  let [imageName, setImageName] = useState("");

  const params = useParams();

  useEffect(() => {
    if (edit_id) {
      dispatch(getDetail(edit_id));
    }
    return () => {
      dispatch({ type: GET_DETAIL, payload: [] });
      dispatch({ type: EDIT_ID, payload: "" });
    };
  }, [dispatch, edit_id]);

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
    if (detail) {
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
      templateAlert("Categoría ya seleccionada", null, "warning", 4000);
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

  const handleNewImage = async (e) => {
    setButtonDisabled(true);
    setImageName(e.target.files[0].name);

    const imageUrl = await uploadFile(e.target.files[0], detail.id);
    setInput({ ...input, image: imageUrl });

    setTimeout(function () {
      setButtonDisabled(false);
    }, 5000);
  };

  const handleShowImage = (e) => {
    e.preventDefault();
    Swal.fire({
      background: "#19191a",
      color: "#e1e1e1",
      imageUrl: input.image,
      imageWidth: 361,
      imageHeight: 554,
      imageAlt: `Cover of ${input.name}`,
      confirmButtonColor: "#355070",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!detail.id) {
      if (Object.keys(errors).length === 0) {
        dispatch(addBooks(input));
      } else {
        templateAlert("Todos los campos son requeridos", null, "info", 4000);
      }
    } else {
      if (Object.keys(errors).length === 0) {
        dispatch(putBook(detail.id, input));
      } else {
        templateAlert("Todos los campos son requeridos", null, "info", 4000);
      }
    }
  };

  useEffect(() => {
    if (create.message) {
      templateAlert(create.message, null, "success", null);
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

      // if (edit_id) {
      //   history.push(`/detail/${edit_id}`);
      //   dispatch({ type: TABLE_VIEW, payload: "dashboard" });
      // }

      dispatch({ type: TABLE_VIEW, payload: "books" });
    } else if (create.messageError) {
      templateAlert(create.messageError, null, "warning", null);
      dispatch(resetCreate());
    }
  }, [create, dispatch]);

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
  }, [dispatch, input, genres.length]);

  return (
    <div className={style.container}>
      {/* <h1 className={style.h1}>
        {params.id ? "Editar libro " : "Agregar Libro"}
      </h1> */}

      <form
        className={style.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className={`${style.divs} ${style.divs_one}`}>
          <div className={style.incontainer}>
            <span className={style.label}>Nombre</span>
            <input
              className={style.input}
              type="text"
              placeholder={detail.id ? detail.name : "Nombre del libro"}
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
              autoFocus
            />
            {input.name && errors.name && (
              <div className={style.err}>
                <BiErrorAlt className={style.err_i} />
                <span>{errors.name}</span>
              </div>
            )}
          </div>
          <div className={style.incontainer}>
            <label className={style.label}>Autor</label>
            <input
              className={style.input}
              type="text"
              placeholder="Nombre del Autor"
              value={input.author}
              name="author"
              onChange={(e) => handleChange(e)}
            />
            {input.author && errors.author && (
              <div className={style.err}>
                <BiErrorAlt className={style.err_i} />
                <span>{errors.author}</span>
              </div>
            )}
          </div>
          <div className={style.incontainer}>
            <label className={style.label}>Editorial</label>
            <input
              className={style.input}
              type="text"
              placeholder="Nombre de la editorial"
              value={input.editorial}
              name="editorial"
              onChange={(e) => handleChange(e)}
            />
            {input.editorial && errors.editorial && (
              <div className={style.err}>
                <BiErrorAlt className={style.err_i} />
                <span>{errors.editorial}</span>
              </div>
            )}
          </div>
          <div className={style.container_cat_box}>
            <div className={style.container_cat}>
              <div className={style.incontainer}>
                <label className={style.label}>Categorías</label>
                <select
                  value="0"
                  onChange={(e) => handleSelect(e)}
                  className={style.selectGenre}
                >
                  <option selected disabled value="0">
                    Seleccione las categorías
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
              </div>
              <div className={style.genreContain}>
                <label className={style.label}>Categorías seleccionadas</label>
                <div className={style.genreContain_int}>
                  {input.genre.map((c) => {
                    return (
                      <div key={c} className={style.divGenre}>
                        <span className={style.text}>{c}</span>
                        <span
                          className={style.btn_delete}
                          onClick={() => handleDelete(c)}
                        >
                          <TiDeleteOutline />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className={style.container_box}>
              <div className={style.incontainer}>
                <label className={style.label}>Año de edición</label>
                <input
                  className={style.input}
                  placeholder="Año"
                  value={input.edition}
                  name="edition"
                  onChange={(e) => handleChange(e)}
                />
                {input.edition && errors.edition && (
                  <div className={style.err}>
                    <BiErrorAlt className={style.err_i} />
                    <span>{errors.edition}</span>
                  </div>
                )}
              </div>
              <div className={style.incontainer}>
                <label className={style.label}>Precio</label>
                <input
                  type="number"
                  className={style.input}
                  placeholder="Precio"
                  value={input.price}
                  name="price"
                  onChange={(e) => handleChange(e)}
                />
                {input.price && errors.price && (
                  <div className={style.err}>
                    <BiErrorAlt className={style.err_i} />
                    <span>{errors.price}</span>
                  </div>
                )}
              </div>
              <div className={style.incontainer}>
                <label className={style.label}>Stock</label>
                <input
                  className={style.input}
                  placeholder="Stock"
                  value={input.stock}
                  name="stock"
                  onChange={(e) => handleChange(e)}
                />
                {input.stock && errors.stock && (
                  <div className={style.err}>
                    <BiErrorAlt className={style.err_i} />
                    <span>{errors.stock}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={`${style.divs} ${style.divs_two}`}>
          <div className={style.incontainer_textArea}>
            <label className={style.label}>Descripción</label>
            <textarea
              className={style.textArea}
              name="description"
              id=""
              type="text"
              placeholder="Descripción del libro"
              value={input.description}
              onChange={(e) => handleChange(e)}
            ></textarea>
            {input.description && errors.description && (
              <div className={style.err}>
                <BiErrorAlt className={style.err_i} />
                <span>{errors.description}</span>
              </div>
            )}
          </div>
          <div className={style.incontainer}>
            <label className={style.label}>Portada</label>
            {/* <input
              className={style.input}
              type="url"
              placeholder="Url portada"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            /> */}
            <div className={style.fileDiv}>
              <div
                className={!buttonDisabled ? style.divLabel : style.divLabelF}
              >
                <label
                  className={
                    !buttonDisabled ? style.fileLabel : style.fileLabelF
                  }
                >
                  <input
                    className={style.fileInput}
                    type="file"
                    onChange={(e) => handleNewImage(e)}
                    disabled={buttonDisabled}
                  />
                  <div className={style.fileLabel_text}>
                    <BsFillImageFill className={style.i_img} />
                    <span>
                      {input.image && !buttonDisabled && imageName
                        ? imageName
                        : "Subir una imagen"}
                    </span>
                  </div>
                </label>
              </div>

              <div
                className={
                  input.image ? style.container_eye : style.container_eye_f
                }
              >
                {buttonDisabled ? (
                  <span className={style.loader}></span>
                ) : (
                  <button
                    disabled={input.image ? false : true}
                    onClick={(e) => handleShowImage(e)}
                  >
                    {input.image ? (
                      <AiFillEye className={style.i_eye} />
                    ) : (
                      <AiFillEyeInvisible className={style.i_eye_f} />
                    )}
                  </button>
                )}
              </div>
            </div>
            {input.image && <p className={style.err}>{errors.image}</p>}
          </div>
          <div className={style.incontainer}>
            <label className={style.label}></label>
            <div className={style.container_buttons}>
              <button
                className={buttonDisabled ? style.btnF : style.btn}
                type="submit"
                disabled={buttonDisabled}
              >
                {detail.id ? "Completar edición" : "Crear libro"}
              </button>
              {/* <Link to={detail.id ? `/detail/${detail.id}` : "/"}> */}
              <button
                className={style.btn_link}
                onClick={(e) => {
                  e.preventDefault();
                  if (edit_id) {
                    history.goBack();
                    dispatch({ type: TABLE_VIEW, payload: "users" });
                  }
                  detail.id &&
                    !edit_id &&
                    dispatch({ type: TABLE_VIEW, payload: "books" });
                  !detail.id &&
                    !edit_id &&
                    dispatch({ type: TABLE_VIEW, payload: "users" });
                }}
              >
                {edit_id || detail.id ? "Cancelar" : "Volver"}
              </button>
              {/*   </Link> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
