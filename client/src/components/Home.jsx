import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogames, getGenres, filterGamesByGenres, orderByName, filterCreated, orderByRating} from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import styled from 'styled-components';


const DivPrincipal = styled.div`    
    background-color:  black;
    background-size: cover; 
    background-position: center;
    margin: -30px;
    `
    const GameGrid = styled.div`
    display: grid;
    grid-column-gap: 20px;
    justify-items: center;    
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, minmax(300px, 1fr));
    gap: 20px;
    overflow: auto;
  `

    const StyledLink = styled(Link)`
    display: block; 
    margin-bottom: 10px;
    font-size: 20px;
    color:  #a8b454;
    font-weight: bold;
    text-shadow: 2px 2px 4px #000000;
    font-family: Cursive;    
    `

    const StyledTitulo = styled.h1`
    font-size: 45px;    
    color: #a8b454;
    `

    const StyledVolverCargar = styled.button`    
    height: 40px;
    width: 250px;
    margin: 6px;
    border-radius: 10px; 
    cursor: pointer;
    color:  #a8b454;
    font-size: 18px;
    font-weight: bold;
    background-color:#383126;
    border: none;      
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
    transition: background-color 1.3s;
    transition: color 1.3s;
    &:hover {
    background-color:  #a8b454;
    color: black;
    border: 1px;
    }
    `
    const Button1 = styled.select`
    height: 35px;
    width: 20%; 
    margin: 5px;
    box-sizing: border-box; 
    border: none;
    color:  #a8b454;
    font-size: 18px;
    font-weight: bold;
    background-color:#383126;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
    transition: background-color 1.3s;
    transition: color 1.3s;
    border-radius: 3px;
    &:hover {
    background-color:  #a8b454;
    color: black;
    border: 1px;
    }
    `
    const Button2 = styled.select`
    height: 35px;
    width: 20%; 
    margin: 5px;
    box-sizing: border-box; 
    border: none;
    color:  #a8b454;
    font-size: 18px;
    font-weight: bold;
    background-color: #383126;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
    transition: background-color 1.3s;
    transition: color 1.3s;
    border-radius: 3px;
    &:hover {
    background-color:#a8b454;
    color: black;
    border: 1px;
    }
    `

    const Button3 = styled.select`
    height: 35px;
    width: 20%; 
    margin: 5px;
    box-sizing: border-box; 
    border: none;
    color:  #a8b454;
    font-size: 18px;
    font-weight: bold;
    background-color:#383126;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
    transition: background-color 1.3s;
    transition: color 1.3s;
    border-radius: 3px;
    &:hover {
    background-color:  #a8b454;
    color: black;
    border: 1px;
    }
    `
    const Boton4 = styled.select`
    height: 35px;
    width: 20%; 
    margin: 5px;
    box-sizing: border-box; 
    border: none;
    color:  #a8b454;
    font-size: 18px;
    font-weight: bold;
    background-color:#383126;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2);
    transition: background-color 1.3s;
    transition: color 1.3s;
    border-radius: 3px;
    &:hover {
    background-color:  #a8b454;
    color: black;
    border: 1px;
    }
    `


export default function Home(){

    const dispatch = useDispatch();// para despachar mis acciones con esa variable
    const allVideogames = useSelector((state) => state.videogames);// me trae todo lo que esta en el estado de videogames, esto es el equivalente a hacer mapStateToProps
    const allGenres = useSelector((state) => state.genres);
    console.log(allGenres);
    console.log(allVideogames);
    

    //estados locales y constantes para paginado
    const [orden, setOrden] = useState('');
    const [currentPage, setCurrentPage] = useState(1);//la pagina actual que arranca en 1 y cual va a ser la pag actual 
    const [gamesForPage, setgamesForPage] = useState(15);//cuantos juegos por pagina(15) 

    const indexOfLastGame = currentPage * gamesForPage; //seteo el index del ultimo juego = pagina actual * (15)juegos por pagina
    const indexOfFirstGame = indexOfLastGame - gamesForPage//seteo el index del primer juego = index del ultimo juego - cantidad de juegos por pagina (15)
    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame)//esto son los personajes que se van a renderizar por pagina
    
    console.log(indexOfLastGame);
    console.log(indexOfFirstGame);
    console.log(currentGames);

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

    // function handleFliterByGenre(e){
    //     dispatch(filterGamesByGenres(e.target.value))
    // }
    function handleFliterByGenre(e){
        e.preventDefault();
        if(e.target.value === 'Todos'){
            dispatch(getVideogames())
        }else{
            dispatch(filterGamesByGenres(e.target.value));
            setCurrentPage(1)
        }
        setCurrentPage(1);
                         
    };

    function handleOrderByRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
        setCurrentPage(1);
        setOrden(e.target.value)
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
        <DivPrincipal>
            <StyledTitulo>The best videogames</StyledTitulo>
            <StyledLink to='/create'>Create videogame</StyledLink>
            <StyledVolverCargar onClick={e=>{handleClick(e)}}>
                HOME
            </StyledVolverCargar>
            <div>
                <Button1 onChange={e => {handleOrderByName(e)}}>
                    <option>Order by alph</option>
                    <option value="asc">Ascendente</option>
                    <option value="des">Descendente</option>
                </Button1>
                <Button2 onChange={e => {handleFilterCreated(e)}}>
                    <option>Created or Existing game</option>
                    <option value="all">Todos</option>
                    <option value="api">Existentes</option>
                    <option value="created">Creados</option>
                </Button2>
                <Button3 onChange={e => {handleFliterByGenre(e)}}> 
                    <option>Filter by Genres</option>
                    <option value="Todos">Todos</option>
                    <option value="Action">Action</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Sports">Sports</option>
                    <option value="Card">Card</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Simulation">Simulation</option>
                    <option value="Massively Multiplayer">Massively Multiplayer</option>
                    <option value="Educational">Educational</option>
                    <option value="Indie">Indie</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Racing">Racing</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Arcade">Arcade</option>
                    <option value="Fighting">Fighting</option>
                    <option value="RPG">RPG</option>
                    <option value="Casual">Casual</option>
                    <option value="Platformer">Platformer</option>
                    <option value="Family">Family</option>
               </Button3>
               <Boton4 onChange={e => {handleOrderByRating(e)}}>  
                    <option>Order by Rating</option>                  
                    <option value="mayor">Rating Menor</option>
                    <option value="menor">Rating Mayor</option>
               </Boton4>
                <Paginado  
                    gamesForPage = {gamesForPage}
                    allVideogames = {allVideogames.length}
                    paginado = {paginado}
                    currentPage = {currentPage}
                />  
                <SearchBar />              
                <GameGrid>
                {
                    currentGames && currentGames.map(el=>{
                        return(
                            <Fragment>
                                <Link  to={`/videogames/${el.id}`} className='cartas'>
                                    <Card name={el.name} genres={ el.genres ? el.genres + ' ' : el.generos.map(el=>el.name + ' ')  } image={el.image} rating={el.rating} key={el.id} id={el.id} />
                                </Link>
                            </Fragment>
                        )
                    })
                }                
                </GameGrid>
            </div>
        </DivPrincipal>
    )
}

   







