import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres, filterGamesByGenres, orderByName, filterCreated} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';



export default function Home(){

    const dispatch = useDispatch();// para despachar mis acciones con esa variable
    const allVideogames = useSelector((state) => state.videogames);// me trae todo lo que esta en el estado de videogames, esto es el equivalente a hacer mapStateToProps
    const allGenres = useSelector((state) => state.genres);
    console.log(allGenres);

    //estados locales y constantes para paginado
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);//la pagina actual que arranca en 1 y cual va a ser la pag actual 
    const [gamesForPage, setgamesForPage] = useState(15);//cuantos juegos por pagina(15) 

    const indexOfLastGame = currentPage * gamesForPage; //seteo el index del ultimo juego = pagina actual * (15)juegos por pagina
    const indexOfFirstGame = indexOfLastGame - gamesForPage//seteo el index del primer juego = index del ultimo juego - cantidad de juegos por pagina (15)
    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)//esto son los personajes que se van a renderizar por pagina
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    };
    //el paginado va a setear la pagina en el numero que se aprete

       

    useEffect(() => { //esto es para traernos del estados los videogames cuando el componente se monta
        dispatch(getVideogames())// estos es lo mismo que hacer mapDispatchToProps
        dispatch(getGenres())
    },[dispatch])
    

    function handleClick(e){
        e.preventDefault();//esto es para que no se recargue la pagina
        dispatch(getVideogames());
    }

    let options = allGenres.map(el => (
        <option key={el.id} value={el.name} >
           {el.name}
        </option>
      ));

    function handleFliterByGenre(e){
        dispatch(filterGamesByGenres(e.target.value))
    }
    
    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    }
    

    return(
        <div>
            <Link to='/videogames'>Crear Videgame</Link>
            <h1>Los mejores Videogames</h1>
            <button onClick={e=>{handleClick(e)}}>
                Volver a cargar todos los videojuegos
            </button>
            <div>
                <select onChange={e => {handleOrderByName(e)}}>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </select>
                <select onChange={e => {handleFilterCreated(e)}}>
                    <option value="all">Todos</option>
                    <option value="api">Existentes</option>
                    <option value="created">Creados</option>
                </select>
                <select onChange={e => handleFliterByGenre(e)}> 
                <option value="todos">Todos</option>
                 {options}
               </select>
                <Paginado  
                    gamesForPage = {gamesForPage}
                    allVideogames = {allVideogames.length}
                    paginado = {paginado}
                />  
                <SearchBar />              
                {
                    currentGames && currentGames.map(el=>{
                        return(
                            <Fragment>
                                <Link to={"/home" + el.id} className='cartas'>
                                    <Card name={el.name} genres={el.genres} image={el.image} key={el.id} />
                                </Link>
                            </Fragment>
                        )
                    })
                }                
            </div>
        </div>
    )
}


// import React, { Fragment, useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getVideogames, getGenres, filterGamesByGenres, orderByName, filterCreated } from '../actions';
// import { Link } from 'react-router-dom';
// import Card from './Card';
// import Paginado from './Paginado';
// import SearchBar from './SearchBar';

// export default function Home() {
//   const dispatch = useDispatch();
//   const allVideogames = useSelector(state => state.videogames);
//   const allGenres = useSelector(state => state.genres);
//   console.log(allGenres);

//   //estados locales y constantes para paginado
//   const [orden, setOrden] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [gamesForPage, setgamesForPage] = useState(15);

//   // Inicializo selectedGenre con un string vacío
//   const [selectedGenre, setSelectedGenre] = useState('');

//   const indexOfLastGame = currentPage * gamesForPage;
//   const indexOfFirstGame = indexOfLastGame - gamesForPage;
//   const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);

//   const paginado = pageNumber => {
//     setCurrentPage(pageNumber);
//   };

//   useEffect(() => {
//     dispatch(getVideogames());
//     dispatch(getGenres());
//   }, [dispatch]);

//   function handleClick(e) {
//     e.preventDefault();
//     dispatch(getVideogames());
//   }

//   const options = allGenres.map(el => (
//     <option key={el.id} value={el.name}>
//     {el.name}
//     </option>
//     ));
    
//     function handleFilterByGenre(e) {
//     // Almaceno el valor seleccionado en selectedGenre
//     setSelectedGenre(e.target.value);
//     }
    
//     function handleOrderByName(e) {
//     e.preventDefault();
//     dispatch(orderByName(e.target.value));
//     setCurrentPage(1);
//     setOrden(e.target.value);
//     }
    
//     function handleFilterCreated(e) {
//     dispatch(filterCreated(e.target.value));
//     }
    
//     // Filtro los juegos por el género seleccionado
//     const filteredGames = allVideogames.filter(game => game.genre === selectedGenre);
    
//     return (

//         <div>
//           <Link to="/videogames">Crear Videgame</Link>
//           <h1>Los mejores Videogames</h1>
//           <button onClick={e => handleClick(e)}>Volver a cargar todos los videojuegos</button>
//           <div>
//             <select onChange={e => handleOrderByName(e)}>
//               <option value="asc">Ascendente</option>
//               <option value="des">Descendente</option>
//             </select>
//             <select onChange={e => handleFilterCreated(e)}>
//               <option value="all">Todos</option>
//               <option value="api">Existentes</option>
//               <option value="db">Creados</option>
//             </select>
//             <select onChange={e => handleFilterByGenre(e)}>
//               <option value="">Todos</option>
//               {options}
//             </select>
//           </div>
//           <SearchBar />
//           <Paginado
//             currentPage={currentPage}
//             gamesForPage={gamesForPage}
//             totalGames={filteredGames.length}
//             paginado={paginado}
//           />
//           {filteredGames
//             .slice(indexOfFirstGame, indexOfLastGame)
//             .map(el => (
//               <Card key={el.id} videogame={el} />
//             ))}
//         </div>
//       );
//       }