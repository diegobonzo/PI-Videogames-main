import React from 'react';
import styled from 'styled-components';


const StyleCard = styled.div`
width: 300px;
height: 340px;
box-shadow: 0 40px 80px 0 rgba(80, 149, 63, 0.4);
`
const Name = styled.h3`
color:  #a8b454;
`
const Genero = styled.h5`
color:  #a8b454;
`
const Rating = styled.h4`
color:  #a8b454;
`



export default function Card({name, image, genres, rating}){
    return(
        <StyleCard>
            <Name>{name}</Name>
            <Genero>{genres}</Genero>
            <Rating>Rating: {rating}</Rating>
            <img src={image} alt="img not found" width="200px" height="200px" />
        </StyleCard>
    )
}