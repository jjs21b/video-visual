// ResultsDisplay.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const GamesDisplay = ({ games }) => {
  return (
    <div className="games-container grid grid-cols-3 gap-4">
      {games.map(game => (
        <div key={game.id} className="game-card p-4">
          <img src={game.background_image} alt={game.name} className="game-img w-full h-48 object-cover" />
          <h3 className="mb-2">{game.name}</h3>
          <Link 
            to={`/game/${game.id}`} 
            className="more-info-btn inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            More Info
          </Link>
        </div>
      ))}
    </div>
  );
};

export default GamesDisplay;
