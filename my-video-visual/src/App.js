import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import GamesDisplay from './ResultsDisplay';
import GameDetails from './GameDetails';

const AppContent = () => {
  const location = useLocation(); // Hook to access the current location
  const showSidebar = !location.pathname.startsWith('/game/');
  const showHeader = !location.pathname.startsWith('/game/'); // Show header only on the front page
  const [games, setGames] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const hasResults = games.length > 0; // Check if there are any games in the state
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchInitialGames = async () => {
    let url = `https://api.rawg.io/api/games?key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    setGames(data.results);
    
  };
  useEffect(() => {
    if (searchPerformed == false){
      fetchInitialGames();
    }
    
  }, []); // Empty dependency array to run only on component mount

  return (
    <div className="app flex min-h-screen bg-gray-800 text-white">
      {/* Conditional Sidebar */}
      {showSidebar && (
        <div className="sidebar w-64"> {/* Adjust width as needed */}
          <Sidebar setGames={setGames} setSearchPerformed={setSearchPerformed} />
        </div>
      )}

       {/* Main Content Area */}
       <div className="flex-grow">
        {/* Conditionally render "Search Results" text only if search has been performed and there are results */}
        {searchPerformed && showHeader && hasResults && (
          <header className="w-full py-8 text-center">
            <h1 className="text-4xl font-bold">
              Search Results 
            </h1>
          </header>
        )}
        {searchPerformed && showHeader && !hasResults && (
          <header className="w-full py-8 text-center">
            <h1 className="text-4xl font-bold">
              No Results Found
            </h1>
          </header>
        )}
         {!searchPerformed && showHeader && (
          <header className="w-full py-8 text-center">
            <h1 className="text-4xl font-bold">
              Find The Game That's Right For You!
            </h1>
          </header>
        )}
        {/* Routes */}
        <Routes>
          <Route path="/" element={<GamesDisplay games={games} />} />
          <Route path="/game/:id" element={<GameDetails setSearchPerformed={setSearchPerformed}/>} />
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
