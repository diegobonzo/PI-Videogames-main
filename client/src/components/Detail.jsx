import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';


export default function Detail(props){
    console.log(props);

    const dispatch = useDispatch();
    const game = useSelector((state) => state.detail);

    useEffect(() =>{
        dispatch(getDetail(props.match.params.id))//aca accedemos al id.
    },[game, dispatch, props.match.params.id]) 


    return(
        <div>
            {
                game.length > 0 ?
                <div>
                    <h1>Soy {game.name}</h1>
                    <img src={game.background_image ? game.background_image : game.image} alt="img"  with="500px" heigth="700px"/>
                    <h2>Genero: {game.genres.map(el => el.name)}</h2>
                    <p>Descripcion: {game.description}</p>
                    <h3>Fecha de lanzamiento: {game.released}</h3>
                    <h3>Raiting: {game.rating}</h3>
                    <h3>Consolas: {game.platforms.map(el => el.platform.name)}</h3>

                </div> : <p>Loading...</p>
            }
            <Link to='/home'><button>Volver</button></Link>
        </div>
    )


}