import React from 'react';

export default function Paginado({gamesForPage, allVideogames, paginado}){
    const pageNumbers  = []; 
    for(let i = 1; i <= Math.ceil(allVideogames/gamesForPage); i++){
        pageNumbers.push(i)        
    }
    return(
        <nav>
            <ul className='paginado'>
                {pageNumbers && pageNumbers.map(number => (
                    <button className='number' key={number} onClick={() => paginado(number)}>
                        {number}
                    </button>
                ))}
            </ul>
        </nav>
    )
}

