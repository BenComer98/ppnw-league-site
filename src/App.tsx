import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import StoresPage from './pages/StoresPage'
import NavBar from './nav/NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import StandingsPage from './pages/StandingsPage';
import PlayersPage from './pages/PlayersPage';
import { usePlayerEventRecords } from './context/DataContext';

function App() {
  const debug = true;
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
    const { playerEventRecords, loading, error, getPlayerEventRecords, getEventRecords } = usePlayerEventRecords();

    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <main>
        <h1>Player Event Records</h1>
        <p>Total Records: {playerEventRecords.length}</p>
        <ul>
          {playerEventRecords.map((record, index) => (
            <li key={index}>
              <strong>Player:</strong> {record.player.name} |
              <strong> Event:</strong> {record.event.name}
            </li>
          ))}
        </ul>

        <section>
          <h2>Filtered by player</h2>
          <p>{JSON.stringify(getPlayerEventRecords('Ben Comer'))}</p>
        </section>
      </main>
    )
  }
}

export default App
