import React from 'react';

const ResultsDisplay = ({ games }) => {
  return (
    <div className="results">
      {games.map(game => (
        <div key={game.id} className="game-card">
          <img src={game.background_image} alt={game.name} />
          <h3>{game.name}</h3>
          {/* Additional game details */}
        </div>
      ))}
    </div>
  );
};

export default ResultsDisplay;
