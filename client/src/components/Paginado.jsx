import React from 'react';

export default function Paginado({gamesForPage, allVideogames, paginado}){
    const pageNumbers  = [];
    for(let i = 0; i <= Math.ceil(allVideogames/gamesForPage); i++){
        pageNumbers.push(i+1)        
    }
    return(
        <nav>
            <ul className='paginado'>
                {pageNumbers && pageNumbers.map(number => (
                    <button className='number' key={number}>
                        <a onClick={()=> paginado(number)}>{number}</a>
                    </button>
                ))}
            </ul>
        </nav>
    )
}

