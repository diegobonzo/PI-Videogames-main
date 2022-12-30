import React, {useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogame, getGenres, getPlatforms } from '../actions';



function validate(input){
    let errors = {};
    
    if(!input.name){
        errors.name = "Se requiere un nombre";
    }else if(!input.image){
        errors.image = "Se requiere una imagen";
    }else if(!input.description){
        errors.description = "Se requiere una descripcion";
    }else if(!input.released){
        errors.released = "Se requiere fecha de creado";
    } else if(!input.rating){
        errors.rating = "Se requiere un rating";
    }else if(!input.platforms){
        errors.platforms = "Se requiere plataforma";
    }else if(!input.generos){
        errors.generos = "Se requiere genero";
    }
    return errors;
}


export default function GameCreate(){
    const dispatch = useDispatch()
    const history = useHistory();
    const generos = useSelector((state) => state.genres);
    const consolas = useSelector((state) => state.platforms);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name:"",
        image:"",
        description:"",
        released:"",
        rating:"",
        platforms:[],        
        generos:[]
    })


    const handleChange = (e) =>{
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
        console.log(input);
    }

    // function handleCheck(e){
    //     if(e.target.cheked){
    //         setInput({
    //             ...input,
    //             platforms: e.target.value
    //         })
    //     }
    // }

    


    const handleSelect =(e)=>{
        setInput({
            ...input,
            generos: [...input.generos, e.target.value]
        })
    }

    const handleSelectPlatform = (e) =>{
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(input);
        dispatch(postVideogame(input))
        alert("Juego Creado!!");
        setInput({
            name:"",
            image:"",
            description:"",
            released:"",
            rating:"",
            platforms:[],            
            generos:[]        
        })
        history.push('/home');
    }

    function handleDelete(el){
        setInput({
            ...input,
            generos: input.generos.filter(g => g !== el)
        })
    }
    function handleDeletePLatforms(el){
        setInput({
            ...input,
            platforms: input.platforms.filter(g => g !== el)
        })
    }



    useEffect(() => {
        dispatch(getGenres())
        dispatch(getPlatforms())
    },[dispatch])


    return(
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Crea tu juego!!</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input 
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    />                    
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Imagen:</label>
                    <input 
                    type="text" 
                    value={input.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.image && (
                        <p className='error'>{errors.image}</p>
                    )}
                </div>
                <div>
                    <label>Description:</label>
                    <input 
                    type="text"
                    value={input.description}
                    name="description"
                    onChange={(e) => handleChange(e)}
                     />
                     {errors.description && (
                        <p className='error'>{errors.description}</p>
                    )}
                </div>
                <div>
                    <label>Released:</label>
                    <input
                     type="text"
                     value={input.released}
                     name="released"
                     onChange={(e) => handleChange(e)}
                      />
                      {errors.released && (
                        <p className='error'>{errors.released}</p>
                    )}
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                     type="number"
                     value={input.rating}
                     name="rating"
                     onChange={(e) => handleChange(e)}
                      />
                      {errors.rating && (
                        <p className='error'>{errors.rating}</p>
                    )}
                </div>
                <div>
                    <label>Platforms:</label>
                    <input 
                    type="text"
                    value={input.platforms}
                    name="platforms"
                    onChange={(e) => handleChange(e)}
                    />
                     {errors.platforms && (
                        <p className='error'>{errors.platforms}</p>
                    )}
                </div>            
                <select onChange={e => handleSelectPlatform(e)}>
                        {consolas.map((c) => (
                            <option value={c.name}>{c.name}</option>
                        ))}                        
                </select>    
                <div>
                    <label>Generos:</label>
                    <input
                     type="text"
                     value={input.generos}
                     name="generos"
                     onChange={(e) => handleChange(e)}
                      />
                       {errors.generos && (
                        <p className='error'>{errors.generos}</p>
                       )}
                </div>
                <select onChange={(e) => handleSelect(e)} >
                    {generos.map((g) =>(
                        <option value={g.name}>{g.name}</option>
                    ))}
                </select>
                
                <button type="submit">Crear Juego</button>
            </form>
            {input.platforms.map(el =>
                <div className='divplatforms'>
                    <p>{el}</p>
                    <button className='btonxplatforms' onClick={() =>handleDeletePLatforms(el)}>x</button>
                </div>
                )}
            {input.generos.map(el => 
                <div className='divgenero'>
                    <p>{el}</p>
                    <button className='botnX' onClick={() => handleDelete(el)}>x</button>
                </div>
                )}
        </div>       

    )
}