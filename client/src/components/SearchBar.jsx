import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getNameGames } from '../actions';


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    const handleInputChange = (e) =>{
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getNameGames(name))
    }


    return(
        <div>
            <input
             type="text"
             placeholder='Buscar...'
             onChange={(e) => handleInputChange(e)}             
             />
             <button type='submit' onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}