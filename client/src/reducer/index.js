
const initialState = {
    videogames: [],    
    allVideogames: [],    
    platforms: [],
    detail: [],
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
        case 'GET_NAME_GAMES':
            return{
                ...state,
                videogames: action.payload
            }   
        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }    
        case 'POST_VIDEOGAMES':
            return{
                ...state,
            }    
        case 'FILTER_BY_GENRES':
            const generos = state.allVideogames;
            const genresFiltered = action.payload === 'todos' ? generos : generos.filter(el => el.genres.name === action.payload);
            // const genresFiltered = action.payload === 'todos' ? generos : generos.map(el=>{
            //     return el.genres.filter(el=> el.name === action.payload)
            // });
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
            return 0;
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
        case 'GET_PLATFORMS':
            const consolas = state.allVideogames
            const plat = consolas.map(el=>el.platforms)
            const todasConsolas = [...new Set(plat.flat())];
            const arrayObjetos = todasConsolas.map(el => ({name:el}))
            return{
                ...state,
                platforms: arrayObjetos
            }
        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }

        default:
            return {...state}        
    }
}


export default rootReducer;