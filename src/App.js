import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/search';
import PokemonDetail from "./pages/pokemonDetail"
import AllList from "./pages/all";
import WatchList from './pages/watchlist';
import Menu from './components/menu';
function App() {
  return (
    <div className="App">
      <Menu />
     <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/pokedex" element={<AllList />}></Route>
        <Route path="/pokemon/:name" element={<PokemonDetail />}></Route>
        <Route path="/watchlist" element={<WatchList />}></Route>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
