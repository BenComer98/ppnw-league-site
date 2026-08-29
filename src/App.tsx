import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import StoresPage from './pages/StoresPage'
import NavBar from './nav/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import StandingsPage from './pages/StandingsPage';
import PlayersPage from './pages/PlayersPage';

function App() {
  const debug = false;
  if (!debug) {
    return (
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/about" element={<AboutPage />}/>
          <Route path="/stores" element={<StoresPage />}/>
          <Route path="/standings" element={<StandingsPage />}/>
          <Route path="/players" element={<PlayersPage />}/>
        </Routes>
    </BrowserRouter>
    );
  }
  else {
    return (
      <div>Testing!</div>
    );
  }
}

export default App
