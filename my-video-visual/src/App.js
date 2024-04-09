import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import GamesDisplay from './ResultsDisplay';
import GameDetails from './GameDetails';

const App = () => {
  const [games, setGames] = useState([]);

  const AppContent = () => {
    const location = useLocation(); // Now it's used in a child component of Router

    const showSidebar = !location.pathname.startsWith('/game/');

    return (
      <div className="app flex">
        {showSidebar && <Sidebar setGames={setGames} />}
        <Routes>
          <Route path="/" element={<GamesDisplay games={games} />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </div>
    );
  };

  return (
    <Router basename='/video-visual'>
      <AppContent />
    </Router>
  );
};

export default App;
