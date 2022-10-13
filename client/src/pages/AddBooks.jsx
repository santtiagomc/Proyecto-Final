import React, { useState, useEffect } from "react";
import { Link ,useHistory } from "react-router-dom";
import { addBooks, getAllBooks } from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";

function validation(input) {
    let errors = {}
    if (!input.name) {
        errors.name = 'Enter a name'
    } 
    else if (!input.name.match(/^[A-Za-z\s]+$/)) {
        errors.name = 'Only letters, please'
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
        author: "",
        description: "description",
        price: "price",
        image: "",
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
                author: "",
                description: "",
                price: "",
                image: "",
                genre: []
            })
            history.push("/books")
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
        dispatch(getAllBooks())      
    }, [dispatch])


    return (
            <div>
                <div>
                    <h1> Add Book </h1>
                </div>
                
                <form onSubmit={e => {handleSubmit(e)}}>
                    <div>
                        <label>Name </label>
                        <input
                            type= "text"
                            value= {input.name.toUpperCase()}
                            name="name" 
                            onChange = {(e) => handleChange(e)} />
                            {errors.name && (<p>{errors.name}</p>)}
                    </div>  
                    <div>
                        <label>Author </label>
                        <input
                            type= "text"
                            value= {input.author}
                            name="author" 
                            onChange = {(e) => handleChange(e)}/>
                            {errors.author && (<p>{errors.author}</p>)}
                    </div>
                    <div>   
                        <label>Description</label>
                        <input
                            type= "text"
                            value= {input.description}
                            name="description" 
                            onChange = {(e) => handleChange(e)}/>
                            {errors.description && (<p >{errors.description}</p>)}
                    </div>
                    <div>
                        <label>Picture   </label>
                        <input
                        type= "url"
                        value= {input.image}
                        name="image" 
                        onChange = {(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label> Genres   </label> 
                        <select value= {input.genre}  onChange = {(e)=> handleSelect(e)}>
                        {genres.map((el) => (<option value={el.name} key={el.id}> {el.name} </option>))}
                        </select>
                    </div>
                    <div>
                        <ul>
                            {input.genre.map(el=>  <li> {el} <button onClick={() =>handleDelete(el)}>X
                            </button></li> )}
                        </ul>
                    </div>
                    <div >
                        <button disabled={Object.keys(errors).length > 0 || input.genre.length === 0 ? true : false} type ='submit'> CREATE </button>          
                        <Link to="/books">
                        <button>BACK</button>
                        </Link>
                    </div>
                </form>
            </div>
    )
}