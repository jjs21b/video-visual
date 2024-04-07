import './App.css';
import React, { useState , useEffect} from 'react';
import ResultsDisplay from './ResultsDisplay'; // Make sure the path is correct
import Sidebar from './sidebar';
import fetchGames from './api'


const App = () => {
  const [filters, setFilters] = useState({});
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetchGames(filters).then(setGames);
  }, [filters]);

  return (
    <div className="app">
      <Sidebar onFiltersChange={setFilters} />
      <ResultsDisplay games={games} />
    </div>
  );
};


export default App;
