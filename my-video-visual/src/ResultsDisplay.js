// ResultsDisplay.js
import React from 'react';

const GamesDisplay = ({ games }) => {
  return (
    <div className="games-container grid grid-cols-3 gap-4">
      {games.map(game => (
        <div key={game.id} className="game-card p-4">
          <img src={game.background_image} alt={game.name} className="game-img w-full h-48 object-cover" />
          <h3 className="game-name mt-2">{game.name}</h3>
          <button className="more-info-btn mt-2 bg-blue-500 text-white py-2 px-4 rounded">More Info</button>
        </div>
      ))}
    </div>
  );
};

export default GamesDisplay;
