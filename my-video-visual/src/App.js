import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import GamesDisplay from './ResultsDisplay';
import GameDetails from './GameDetails';

const AppContent = () => {
  const location = useLocation(); // Hook to access the current location
  const showSidebar = !location.pathname.startsWith('/game/');
  const showHeader = location.pathname === '/'; // Show header only on the front page
  const [games, setGames] = useState([]);
  return (
    <div className="app flex min-h-screen bg-gray-800 text-white">
      {showHeader && (
        <header className="w-full py-8 text-center">
          <h1 className="text-4xl font-bold">
            Find the Game You're Looking For
          </h1>
        </header>
      )}
      {showSidebar && <Sidebar setGames={setGames} />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<GamesDisplay games={games} />} />
          <Route path="/game/:id" element={<GameDetails />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {

  return (
    <Router basename='/video-visual'>
      <AppContent />
    </Router>
  );
};

export default App;
