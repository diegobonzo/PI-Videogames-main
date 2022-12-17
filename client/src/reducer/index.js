
const initialState = {
    videogames: [],
    genres: []
}

//el reducer es una funcion que se encargan de actualizar el estado de la aplicación en respuesta a las acciones emitidas por el store.

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }    

        default:
            return {...state}        
    }
}


export default rootReducer;