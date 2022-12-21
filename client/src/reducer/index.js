
const initialState = {
    videogames: [],    
    allVideogames: [],    
    genres: []
}

//el reducer es una funcion que se encargan de actualizar el estado de la aplicación en respuesta a las acciones emitidas por el store.

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,    
                allVideogames: action.payload            
            }
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }    
        case 'FILTER_BY_GENRES':
            const generos = state.allVideogames;
            const genresFiltered = generos.filter(el => el.genres.name === action.payload);
            return{
                ...state,
                videogames: genresFiltered,
            }    
        case 'ORDER_BY_NAME':
            const sortName = action.payload === 'asc'?
            state.videogames.sort(function(a,b){
                if(a.name > b.name){
                    return 1
                }
                if(b.name > a.name){
                    return -1
                }
                return 0;                
            }):
            state.videogames.sort(function(a,b){
            if(a.name > b.name){
                return -1;
            }
            if(b.name > a.name){
                return 1;
            }
        })
            return{
                ...state,
                videogames: sortName
            }


        case 'FILTER_CREATED':
            const allVideogames = state.allVideogames
            const createdFilter = action.payload === 'created' ? allVideogames.filter(el => el.createdInDb) 
            : allVideogames.filter(el => !el.createdInDb)
            return{
                ...state,
                videogames: action.payload === 'all' ? state.allVideogames : createdFilter
            }

        default:
            return {...state}        
    }
}


export default rootReducer;