import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducer";


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

//Almacena el estado de la aplicación y es accesible desde cualquier lugar de la aplicación.