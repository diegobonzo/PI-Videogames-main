import React, {useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postVideogame, getGenres, getPlatforms } from '../actions';
import styled from 'styled-components';



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
    }else if(!input.genres){
        errors.genres = "Se requiere genero";
    }
    return errors;
}

const Div = styled.div`
    background-image: url('https://phantom-marca.unidadeditorial.es/6b007990c0576611bde79027ad46cb99/crop/0x0/1916x1078/resize/1320/f/jpg/assets/multimedia/imagenes/2022/03/23/16480261016982.jpg');
    background-size: cover;
    height: 100vh;
    background-position: center;
    margin: -33px;      
    `
    const Titulo = styled.h1`
    font-size: 45px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #1b652c;
    `

    const Boton = styled.button`
    box-shadow: 20 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #eeb56a;
    border-radius: 12px;
    width: 75px;
    transition: background-color 1.3s;
    transition: color 1.3s;
    &:hover {
    background-color:  #a8b454;
    color: black;
    border: 1px;
    }
    `
    const Form = styled.form`    
    opacity: 0.5;
    text-align: left;
    float: left;
    display: block;
    width: 100%;
    margin: 35px;
    `
    const Input1 = styled.div`
    float: left;
    display: block;
    width: 100%;
    margin-bottom: 5px;
    `
    const Input2 = styled.div`
    float: left;
    display: block;
    width: 100%;
    margin-bottom: 5px;
    `
    const Input3 = styled.div`
    float: left;
    display: block;
    width: 100%;
    margin-bottom: 5px;
    `
    const Input4 = styled.div`
    float: left;
    display: block;
    width: 100%;
    margin-bottom: 5px;
    `
    const Input5 = styled.div`
    float: left;
    display: block;
    width: 100%;
    margin-bottom: 5px;
    `
    const Input6 = styled.div`
    float: left;
    display: block;
    width: 100%;
    margin-bottom: 5px;
    `
    const Nombre = styled.label`  
    color  : white ;
    font-size: 28px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    `
    const InputNombre = styled.input`
    margin-left: 65px;
    `

    const Imagen = styled.label`    
    color  : white ;
    font-size: 28px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `
    const InputImage = styled.input`
    margin-left: 65px;
    `

    const Descripcion = styled.label` 
    color  : white ;
    font-size: 28px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `

    const Released = styled.label`    
    color  : white ;
    font-size: 28px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `
    const InputReleased = styled.input`
    margin-left: 33px;
    `

    const Rating = styled.label`    
    color  : white ;
    font-size:28px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    `
    const InputRating = styled.input`
    margin-left: 63px;
    `

    const Plataforma = styled.label`    
    color  : white ;
    font-size: 28px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;     
    `
    const InputPlat = styled.input`
    margin-left: 26px;
    `

    const SelectPlat = styled.select`
    margin-left: 152px;
    `   

    const Generos = styled.label`    
    color  : white ;
    font-size: 28px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;    
    `
    const InputGenres = styled.input`
    margin-left: 60px;
    `

    const BtonCrear = styled.button`
    display: inline-block;
    margin-left: 152px;
    margin-top: 20px;
    cursor: pointer;
    background-color: #eeb56a;
    height: 40px;
    width: 190px;
    transition: background-color 2.3s;
    transition: color 1.3s;
    &:hover {
    background-color:  #a8b454;
    color: black;
    border: 1px;
    }
    `
    const SelectGenres = styled.select`
    display: block;
    margin-left: 152px;
    `




export default function GameCreate(){
    const dispatch = useDispatch()
    const history = useHistory();
    const genres = useSelector((state) => state.genres);
    const consolas = useSelector((state) => state.platforms);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        name:"",
        image:"",
        description:"",
        released:"",
        rating:"",
        platforms:[],        
        genres:[]
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

    

    const handleSelect =(e)=>{
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    const handleSelectPlatform = (e) =>{
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        const errors = validate(input);
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
          // Si no hay errores, llama a la acción de crear juego
          dispatch(postVideogame(input));
          history.push('/home');
        }
      }

    // const handleSubmit = (e) =>{
    //     e.preventDefault();
    //     console.log(input);
    //     dispatch(postVideogame(input))
    //     alert("Game created!!!");
    //     setInput({
    //         name:"",
    //         image:"",
    //         description:"",
    //         released:"",
    //         rating:"",
    //         platforms:[],            
    //         genres:[]        
    //     })
    //     history.push('/home');
    // }

    function handleDelete(el){
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== el)
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
        <Div>
            <Titulo>Create your own videogame</Titulo>
            <Link to='/home'><Boton>HOME</Boton></Link>
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Input1>
                    <Nombre>Name:</Nombre>
                    <InputNombre 
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    />                    
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </Input1>
                <Input2>
                    <Imagen>Image:</Imagen>
                    <InputImage 
                    type="text" 
                    value={input.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.image && (
                        <p className='error'>{errors.image}</p>
                    )}
                </Input2>
                <Input3>
                    <Descripcion>Description:</Descripcion>
                    <input 
                    type="text"
                    value={input.description}
                    name="description"
                    onChange={(e) => handleChange(e)}
                     />
                     {errors.description && (
                        <p className='error'>{errors.description}</p>
                    )}
                </Input3>
                <Input4>
                    <Released>Released:</Released>
                    <InputReleased
                     type="text"
                     value={input.released}
                     name="released"
                     onChange={(e) => handleChange(e)}
                      />
                      {errors.released && (
                        <p className='error'>{errors.released}</p>
                    )}
                </Input4>
                <Input5>
                    <Rating>Rating:</Rating>
                    <InputRating
                     type="number"
                     value={input.rating}
                     name="rating"
                     onChange={(e) => handleChange(e)}
                      />
                      {errors.rating && (
                        <p className='error'>{errors.rating}</p>
                    )}
                </Input5>
                <Input6>
                    <Plataforma>Platforms:</Plataforma>
                    <InputPlat 
                    type="text"
                    value={input.platforms}
                    name="platforms"
                    onChange={(e) => handleChange(e)}
                    />
                     {errors.platforms && (
                        <p className='error'>{errors.platforms}</p>
                    )}
                </Input6>            
                <SelectPlat onChange={e => handleSelectPlatform(e)}>
                        {consolas.map((c) => (
                            <option value={c.name}>{c.name}</option>
                        ))}                        
                </SelectPlat>    
                <div>
                    <Generos>Genres:</Generos>
                    <InputGenres
                     type="text"
                     value={input.genres}
                     name="genres"
                     onChange={(e) => handleChange(e)}
                      />
                       {errors.genres && (
                        <p className='error'>{errors.genres}</p>
                       )}
                </div>
                <SelectGenres onChange={(e) => handleSelect(e)} >
                    {genres.map((g) =>(
                        <option value={g.name}>{g.name}</option>
                    ))}
                </SelectGenres>
                
                <BtonCrear type="submit">CREATED GAME</BtonCrear>
            </Form>
            {input.platforms.map(el =>
                <div className='divplatforms'>
                    <p>{el}</p>
                    <button className='btonxplatforms' onClick={() =>handleDeletePLatforms(el)}>x</button>
                </div>
                )}
            {input.genres.map(el => 
                <div className='divgenero'>
                    <p>{el}</p>
                    <button className='botnX' onClick={() => handleDelete(el)}>x</button>
                </div>
                )}
        </Div>       

    )
}