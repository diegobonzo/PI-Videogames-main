import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';



export default function Home(){

    const dispatch = useDispatch();// para despachar mis acciones con esa variable
    const allVideogames = useSelector((state) => state.videogames);// me trae todo lo que esta en el estado de videogames, esto es el equivalente a hacer mapStateToProps
    const allGenres = useSelector((state) => state.genres);
    console.log(allGenres);


    useEffect(() => { //esto es para traernos del estados los videogames cuando el componente se monta
        dispatch(getVideogames())// estos es lo mismo que hacer mapDispatchToProps
    },[dispatch])

    function handleClick(e){
        e.preventDefault();//esto es para que no se recargue la pagina
        dispatch(getVideogames());
    }

    const options = allGenres.map(el => (
        <option key={el.id} value={el.name} >
           {el.name}
        </option>
      ));
    

    return(
        <div>
            <Link to='/videogames'>Crear Videgame</Link>
            <h1>Los mejores Videogames</h1>
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los videojuegos
            </button>
            <div>
                <select>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </select>
                <select>
                    <option value="all">Todos</option>
                    <option value="api">Existentes</option>
                    <option value="created">Creados</option>
                </select>
                <select> 
                     {options}
                </select>
                {
                    allVideogames?.map(el=>{
                        return(
                            <Fragment className='cartas'>
                                <Link to={"/home" + el.id}>
                                    <Card name={el.name} genre={el.genre} image={el.image} key={el.id} />
                                </Link>
                            </Fragment>
                        )
                    })
                }                
            </div>
        </div>
    )
}