import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { addBooks, getGenres, resetCreate } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./AddBooks.module.css"

function validation(input) {
  let errors = {}
  if (!input.name) {
    errors.name = 'Ingresa un nombre'
  }
  else if (!input.name.match(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g)) {
    errors.name = 'Solo letras, por favor'
  }
  if (!input.image) {
    errors.image = "Ingresa una imagen"
  }
  if (!input.author) {
    errors.author = 'Autor es requerido'
  }
  if (!input.description) {
    errors.description = 'Descripción es requerida'
  }
  if (!input.price) {
    errors.price = 'Precio es requerido'
  } else if (input.price > 10000) {
    errors.price = "El precio debe ser igual o menor a 10000,00"
  } else if (input.price < 0) {
    errors.price = "El precio debe ser mayor a 0"
  } else if (!input.price.match(/^\d{3}(.\d{1,2})?$/)) {
    errors.price = 'Precio debe tener como máximo dos decimales'
  }
  if (!input.stock) {
    errors.stock = 'Stock es requerido'
  }
  if (!input.editorial) {
    errors.editorial = 'Editorial es requerdio'
  }
  if (!input.edition) {
    errors.edition = 'Edicion es requerido'
  } else if (input.edition < 1800) {
    errors.edition = "El año debe ser mayor a 1800"
  } else if (input.edition > 2023) {
    errors.edition = "el año debe ser menor a 2023"
  }
  if (input.genre.length === 0) {
    errors.genre = 'Deberias seleccionar un genero'
  }
  return errors;
}

export default function CreateBook() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { genres, create } = useSelector(state => state)
  const [errors, setErrors] = useState({})

  const [input, setInput] = useState({
    name: "",
    image: "",
    author: "",
    description: "",
    price: "",
    stock: "",
    editorial: "",
    edition: "",
    genre: []
  });

  function handleSelect(e) {
    if (input.genre.includes(e.target.value)) {
      alert("El género seleccionado ya se encuentra en la lista");
    } else {
      setInput({
        ...input,
        genre: [...input.genre, e.target.value]
      })
    }
  }

  const handleDelete = (e) => {
    setInput({
      ...input,
      genre: input.genre.filter(el => el !== e)
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (Object.keys(errors).length === 0) {
      dispatch(addBooks(input))
      console.log(create)

    }
    else {
      alert("Creacion no realizada!")
    }
  }

  useEffect(() => {
    if (create.message) {
      alert(create.message)
      dispatch(resetCreate())
      setInput({
        name: "",
        image: "",
        author: "",
        description: "",
        price: "",
        stock: "",
        editorial: "",
        edition: "",
        genre: []
      })
      history.push("/")
    } else if (create.messageError) {
      alert(create.messageError)
      dispatch(resetCreate())
    }
  }, [create])

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validation({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    dispatch(getGenres())
    setErrors(validation(input))
  }, [dispatch, input])

  return (
    <div className={style.container}>
      <div className={style.containerForm}>
        <div>
          <h1> Agregar Libro </h1>
        </div>
        <div className={style.formulario}>
          <form onSubmit={e => { handleSubmit(e) }}>
            <div className={style.incontainer}>
              <label>Nombre </label>
              <input
                className={style.input}
                type="text"
                placeholder="Nombre del libro"
                value={input.name.toLowerCase()}
                name="name"
                onChange={(e) => handleChange(e)} />
              {errors.name && (<p className={style.err}>{errors.name}</p>)}
            </div>
            <div className={style.incontainer}>
              <label>Portada   </label>
              <input
                className={style.input}
                type="url"
                placeholder="Url portada"
                value={input.image}
                name="image"
                onChange={(e) => handleChange(e)}
              />
              {errors.image && (<p className={style.err}>{errors.image}</p>)}
            </div>
            <div className={style.incontainer}>
              <label>Autor </label>
              <input
                className={style.input}
                type="text"
                placeholder="Nombre del Autor"
                value={input.author}
                name="author"
                onChange={(e) => handleChange(e)} />
              {errors.author && (<p className={style.err}>{errors.author}</p>)}
            </div>
            <div className={style.incontainer}>
              <label>Precio</label>
              <input
                className={style.input}
                type="number"
                placeholder="Precio"
                value={input.price}
                name="price"
                min="1,00"

                max="1000,00"
                onChange={(e) => handleChange(e)} />
              {errors.price && (<p className={style.err}>{errors.price}</p>)}
            </div>
            <div className={style.incontainer}>
              <label>Stock</label>
              <input
                className={style.input}
                type="number"
                placeholder="Stock"
                value={input.stock}
                min="1"
                max="50"
                name="stock"
                onChange={(e) => handleChange(e)} />
              {errors.stock && (<p className={style.err}>{errors.stock}</p>)}
            </div>
            <div className={style.incontainer}>
              <label>Editorial</label>
              <input
                className={style.input}
                type="text"
                placeholder="Nombre de la editorial"
                value={input.editorial}
                name="editorial"
                onChange={(e) => handleChange(e)} />
              {errors.editorial && (<p className={style.err}>{errors.editorial}</p>)}
            </div>
            <div className={style.incontainer}>
              <label>Año de edición</label>
              <input
                className={style.input}
                type="number"
                placeholder="Año"
                value={input.edition}
                name="edition"
                onChange={(e) => handleChange(e)} />
              {errors.edition && (<p className={style.err}>{errors.edition}</p>)}
            </div>
            <div className={style.incontainer}>
              <label >Descripción</label>
              <textarea className={style.descripcion} name="description" id="" cols="30" rows="100"
                type="text"
                placeholder="Descripción del libro"
                value={input.description}
                onChange={(e) => handleChange(e)}>

              </textarea>
              {errors.description && (<p className={style.err}>{errors.description}</p>)}
            </div>
            <div className={style.incontainer}>
              <label> Géneros   </label>
              <select value="0" onChange={e => handleSelect(e)} className={style.selectGenre}>
                <option selected disabled value="0">Géneros</option>
                {genres.map(el => {
                  return (
                    <option key={el} value={el}> {el} </option>)
                })}

              </select>
              {errors.genre && (<p className={style.err}>{errors.genre}</p>)}
            </div>

            <div className={style.genreContain}>
              {input.genre.map(c => {

                return (
                  <div key={c} className={style.divGenre}>
                    <ul >
                      <li>{c}</li>
                      <button className={style.btnx} onClick={() => handleDelete(c)}>X</button>
                    </ul>
                  </div>)
              })}
            </div>
            {<div>
              <button className={style.btn} type='submit'> Crear </button>
              <Link to="/">
                <button className={style.btn} >Volver</button>
              </Link>
            </div>}
          </form>
        </div>
      </div>
    </div>
  )
}