import React, { useState, useEffect } from "react";
import { Link ,useHistory } from "react-router-dom";
import { addBooks, getGenres } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from "./AddBooks.module.css"

function validation(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Enter a name'
    } 
    else if (!input.name.match(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g)) {
        errors.name = 'Only letters, please'
    }
    if (!input.image) {
        errors.image = "Enter a Image"
    }
    if (!input.author) {
      errors.author = 'Author is required'
    }
    if (!input.description) {
      errors.description = 'Description is required'
    }
    if (!input.price) {
      errors.price = 'Price is required'
    }
    if (!input.stock) {
        errors.stock = 'Stock is required'
    }
    if (!input.editorial) {
        errors.editorial = 'Editorial is required'
    }
    if (!input.edition) {
        errors.edition = 'Edition is required'
    }
    if (input.genre.length === 0) {
      errors.genre = 'Must have at least one genre'
    }
    return errors;
}

export default function CreateBook() {
    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(state => state.genres)
    const [ errors, setErrors ] = useState({})

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
            alert("Already in the list");  
        } else { 
            setInput({
                ...input,
                genre:[...input.genre, e.target.value]
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
        if (input.name && input.genre) {
            e.preventDefault();
            dispatch(addBooks(input))
            alert("Congrats! Your new breed was created")
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
        }
        else{
            alert ("Missing info!")
        }
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
         })
         setErrors(validation({
             ...input,
             [e.target.name] : e.target.value
         }))
    }

    useEffect (() => {
        dispatch(getGenres())      
    }, [dispatch])


    return (
            <div className={style.containerForm}>
                <div>
                    <h1> Add Book </h1>
                </div>
                
                <form onSubmit={e => {handleSubmit(e)}}>
                    <div>
                        <label>Name </label>
                        <input
                            type= "text"
                            placeholder="Book Name"
                            value= {input.name.toLowerCase()}
                            name="name" 
                            onChange = {(e) => handleChange(e)} />
                            {errors.name && (<p className={style.err}>{errors.name}</p>)}
                    </div>  
                    <div>
                        <label>Picture   </label>
                        <input
                        type= "url"
                        placeholder="Url image"
                        value= {input.image}
                        name="image" 
                        onChange = {(e) => handleChange(e)}
                        />
                        {errors.image && (<p className={style.err}>{errors.image}</p>)}
                    </div>
                    <div>
                        <label>Author </label>
                        <input
                            type= "text"
                            placeholder="Name Author"
                            value= {input.author}
                            name="author" 
                            onChange = {(e) => handleChange(e)}/>
                            {errors.author && (<p className={style.err}>{errors.author}</p>)}
                    </div>
                    <div>   
                        <label>Description</label>
                        <input
                            type= "text"
                            placeholder="Book Description"
                            value= {input.description}
                            name="description" 
                            onChange = {(e) => handleChange(e)}/>
                            {errors.description && (<p className={style.err}>{errors.description}</p>)}
                    </div>
                    <div>   
                        <label>Price</label>
                        <input
                            type= "number"
                            placeholder="Price Max 1000"
                            value= {input.price}
                            name="price"
                            min="1" 
                            max="1000"
                            onChange = {(e) => handleChange(e)}/>
                            {errors.price && (<p className={style.err}>{errors.price}</p>)}
                    </div>
                    <div>   
                        <label>Stock</label>
                        <input
                            type= "number"
                            placeholder="Stock"
                            value= {input.stock}
                            min= "1"
                            name="stock" 
                            onChange = {(e) => handleChange(e)}/>
                            {errors.stock && (<p className={style.err}>{errors.stock}</p>)}
                    </div>
                    <div>   
                        <label>Editorial</label>
                        <input
                            type= "text"
                            placeholder="Ej: 1800 - 2023"
                            value= {input.editorial}
                            name="editorial" 
                            min="1800"
                            max="2023"
                            onChange = {(e) => handleChange(e)}/>
                            {errors.editorial && (<p className={style.err}>{errors.editorial}</p>)}
                    </div>
                    <div>   
                        <label>Edition Year</label>
                        <input
                            type= "number"
                            placeholder="Edition Year"
                            value= {input.edition}
                            name="edition" 
                            onChange = {(e) => handleChange(e)}/>
                            {errors.edition && (<p className={style.err}>{errors.edition}</p>)}
                    </div>
                    <div>
                        <label> Genres   </label> 
                        <select value= {input.genre}  onChange = {(e)=> handleSelect(e)}>
                        {genres.map((el) => (<option value={el}> {el} </option>))}
                        </select>
                        {errors.genre && (<p className={style.err}>{errors.genre}</p>)}
                    </div>
                    
                    <div>
                        <ul>
                            {input.genre.map(el=>  <li> {el} <button onClick={() =>handleDelete(el)}>X
                            </button></li> )}
                        </ul>
                    </div>
                    <div >
                        <button disabled={Object.keys(errors).length > 0 || input.genre.length === 0 ? true : false} type ='submit'> CREATE </button>          
                        <Link to="/">
                        <button>BACK</button>
                        </Link>
                    </div>
                </form>
            </div>
    )
}