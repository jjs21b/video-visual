// ResultsDisplay.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const GamesDisplay = ({ games }) => {
  return (
    <div className="games-container bg-gray-800 p-8 min-h-screen">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {games.map(game => (
      <div key={game.id} className="game-card flex flex-col justify-between bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"> {/* Added flex styles here */}
        { game.background_image && (
          <img src={game.background_image} alt={game.name} className="w-full min-h-48 object-cover" />  
        )}

        <div className="p-4 flex flex-col justify-between h-full"> {/* Added flex styles here */}
          <h3 className="game-name text-lg text-white font-semibold mb-2">{game.name}</h3>
          <Link 
            to={`/game/${game.id}`} 
            className="more-info-btn mt-2 block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-300 ease-in-out mb-2"  
          >
            More Info
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default GamesDisplay;
