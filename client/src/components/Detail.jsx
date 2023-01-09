import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions';
import { useEffect } from 'react';
import styled from 'styled-components';


const DivPrincipal = styled.div`
    background-color: black;
    margin: -25px
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
    padding-left: 45px;
    padding-right: 45px;
    `
    const Fecha = styled.h3`
    color:  #a8b454;
    `
    const Rating = styled.h3`
    color:  #a8b454;
    `
    const Volver = styled.button`
    background-color:#383126;
    color:  #a8b454;
    cursor: pointer;
    transition: background-color 1.3s;
    transition: color 1.3s;    
    &:hover {
    background-color:  #a8b454;
    color: black;
    border: 1px;
    }
    `
    const Genero = styled.h2`
    color:  #a8b454;
    `
    const Platforms = styled.h3`
    color:  #a8b454;
    `



export default function Detail({id}){

    const dispatch = useDispatch();
    const game = useSelector((state) => state.detail);
    console.log(game);

    useEffect(() =>{
        dispatch(getDetail(id))//aca accedemos al id.
    },[dispatch, id]) 

    

    return(
        <DivPrincipal>
            {
                 game === null || game === undefined ? (  
                    <p>Loading...</p>): (               
                    
                <div>
                    <Name>{game.map(el=>el.name)}</Name>
                    <Imagen src={ game.map(el=>el.image)}  alt="img" />
                    <Genero>Genres: {game.map(el => el.genres + ' ')}</Genero>
                    <Descrption>{game.map(el=>el.description)}</Descrption>
                    <Fecha>Release date {game.map(el=>el.released)}</Fecha>
                    <Rating>Raiting {game.map(el=>el.rating)}</Rating>
                    <Platforms>Plataforms: {game.map(el => el.platforms + ' ')}</Platforms>
                </div>) 
            }
            <Link to='/home'><Volver>Home</Volver></Link>
        </DivPrincipal>
    )


}