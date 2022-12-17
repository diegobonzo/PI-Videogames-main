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

export function getGenres(){
    return async function(dispatch){
        let json = await axios.get("http://localhost:3001/generos");
        return dispatch ({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

