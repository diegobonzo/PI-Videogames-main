import React from 'react';
import styled from 'styled-components';

const Boton = styled.button`
margin: 3px;
`




export default function Paginado({gamesForPage, allVideogames, paginado}){
    const pageNumbers  = []; 
    for(let i = 1; i <= Math.ceil(allVideogames/gamesForPage); i++){
        pageNumbers.push(i)        
    }
    return(
        <nav>
            <ul className='paginado'>
                {pageNumbers && pageNumbers.map(number => (
                    <Boton className='number' key={number} onClick={() => paginado(number)}>
                        {number}
                    </Boton>
                ))}
            </ul>
        </nav>
    )
}

