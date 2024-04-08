import './App.css';
// App.js
import React, { useState } from 'react';
import Sidebar from './sidebar';
import GamesDisplay from './ResultsDisplay'; // Adjust the import path as necessary

const App = () => {
  const [games, setGames] = useState([]);

  return (
    <div className="app flex">
      <Sidebar setGames={setGames} />
      <GamesDisplay games={games} />
    </div>
  );
};

export default App;
