import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import GameCreate from './components/GameCreate';
import Detail from './components/Detail';



//El BrowserRouter proporciona a la aplicación la capacidad de navegar entre diferentes rutas o páginas utilizando el componente Route

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = '/' component={ LandingPage } />
          <Route path = '/home' component={ Home } />
          <Route path='/videogames' component={ GameCreate } />
          <Route path='/home/:id' component={ Detail } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
