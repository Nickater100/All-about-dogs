import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Indice from './components/Indice';
import Home from './components/Home';
import GameDetail from './components/GameDetails';
import AddGame from './components/AddGame';

function App() {
  return (
    <Router>
    <div className="App">
        <Routes>
        <Route exact path="/" element={<Indice/>}/>
        <Route exact path="home" element={<Home/>}/>
        <Route exact path='home/:id' element={<GameDetail/>}/>
        <Route exact path='game-add' element={<AddGame/>}/>
        </Routes>  
    </div>
    </Router>
  );
}

export default App;
