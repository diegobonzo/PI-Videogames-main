import React from 'react';
import styled from 'styled-components';

const StyledBoton = styled.button`
margin: 3px;
cursor: pointer;
border-radius: 6px;
&.current {
    background-color:  #a8b454;
  }
`



export default function Paginado({gamesForPage, allVideogames, paginado,currentPage}){
    const pageNumbers  = []; 
    for(let i = 1; i <= Math.ceil(allVideogames/gamesForPage); i++){
        pageNumbers.push(i)        
    }
    return(
        <nav>
            <ul className='paginado'>
                {pageNumbers && pageNumbers.map(number => (
                    <StyledBoton className={number === currentPage ? 'number current' : 'number'}
                     key={number}
                      onClick={() => paginado(number)}>
                        {number}
                    </StyledBoton>
                ))}
            </ul>
        </nav>
    )
}

