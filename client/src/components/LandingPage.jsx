import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";



const DivLanding = styled.div`
    background-image: url('https://articles-img.sftcdn.net/image/upload/v1582492793/videojuegos_11_call_of_duty_n8nrjf.jpg');
    height:100vh;
    width: 100vw;
    background-size: cover;
    margin: -25px
    
`

const Titulo = styled.h1`
font-size: 35px;
font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
padding-top: 5px;
`
const Boton = styled.button`
box-shadow: 35px 10px 10px rgba(0, 0, 0, 0.5);
background-color: #455919;
border-radius: 0.5em;
cursor: pointer;
position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 75px;
  height: 45px

`

export default function LandingPage(){
    return(
        <DivLanding>
            <Titulo>Play videogames</Titulo>
            <Link to='/home'>
                <Boton>Let´s go</Boton>
            </Link>
        </DivLanding>
    )
};