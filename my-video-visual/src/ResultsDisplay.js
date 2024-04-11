// ResultsDisplay.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const GamesDisplay = ({ games }) => {
  return (
    <div className="games-container bg-gray-800 p-8 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {games.map(game => (
          <div key={game.id} className="game-card bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col h-full"> {/* Ensured full height and flex column */}
            {game.background_image ? (
              <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full min-h-48 bg-gray-600 flex items-center justify-center"> {/* Placeholder for no image */}
                <span className="text-white text-sm">No image available</span>
              </div>
            )}
  
            <div className="p-4 flex flex-col flex-grow"> {/* Added flex-grow */}
              <h3 className="game-name text-lg text-white font-semibold mb-2">{game.name}</h3>
              <div className="mt-auto"> {/* Pushes the button to the bottom */}
                <Link 
                  to={`/game/${game.id}`} 
                  className="more-info-btn block text-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out mb-2"
                >
                  More Info
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default GamesDisplay;
