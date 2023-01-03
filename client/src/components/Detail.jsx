import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';
import styled from 'styled-components';


export default function Detail({id}){

    const dispatch = useDispatch();
    const game = useSelector((state) => state.detail);
    console.log(game);

    useEffect(() =>{
        dispatch(getDetail(id))//aca accedemos al id.
    },[dispatch, id]) 

    const DivPrincipal = styled.div`
    background-color: black;
    `

    const Imagen = styled.img`
    width: 600px;
    height: 350px;
    box-shadow: 0 40px 80px 0 rgba(80, 149, 63, 0.4);
    `
    const Name = styled.h1`
    color:  #a8b454;
    `
    const Descrption = styled.p`
    color:  #a8b454;
    `
    const Fecha = styled.h3`
    color:  #a8b454;
    `
    const Rating = styled.h3`
    color:  #a8b454;
    `

    return(
        <DivPrincipal>
            {
                 game === null || game === undefined ? (  
                    <p>Loading...</p>): (               
                    
                <div>
                    <Name>{game.map(el=>el.name)}</Name>
                    <Imagen src={ game.map(el=>el.image)}  alt="img" />
                    {/* <h2>Genero: {game.genres.map(el => el.name)}</h2> */}
                    <Descrption>{game.map(el=>el.description)}</Descrption>
                    <Fecha>Lanzamiento {game.map(el=>el.released)}</Fecha>
                    <Rating>Raiting {game.map(el=>el.rating)}</Rating>
                    {/* <h3>Consolas: {game.platforms.map(el => el.platform.name)}</h3> */}

                </div>) 
            }
            <Link to='/home'><button>Volver</button></Link>
        </DivPrincipal>
    )


}