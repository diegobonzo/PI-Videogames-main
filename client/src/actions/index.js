import axios from "axios";


// Las acciones son mensajes que se envían al store cuando algo interesante sucede en la aplicación, como hacer clic en un botón o escribir en un formulario

export function getVideogames(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
};

export function getNameGames(name){
    return async function(dispatch){
        try {
            let json = await axios.get("http://localhost:3001/videogames?name=" + name);
            return dispatch({
                type: 'GET_NAME_GAMES',
                payload: json.data
            })            
        } catch (error) {
            console.log(error);
        }
    }
}

export function getGenres(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/generos");
        return dispatch ({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export function postVideogame(payload){
    return async function(dispatch){
        let json = await axios.post("http://localhost:3001/videogames", payload);
        console.log(json);
        return json;
    }
}


export function filterGamesByGenres(payload){
    console.log(payload);
    return{
        type: 'FILTER_BY_GENRES',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
    
}

export function getPlatforms(payload){
    return{
        type: 'GET_PLATFORMS',
        payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/videogames/" + id);        
        return dispatch({
            type: 'GET_DETAILS',
            payload: json.data
        })
    }
}