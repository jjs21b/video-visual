import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { Spinner } from './ResultsDisplay';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const WishList = ({ wishlist, removeFromWishlist, setWishlist }) => {
    const clearWishlist = () => {
        setWishlist([]);
    };
    return (
        <div className="wishlist-container bg-gray-800 p-8 min-h-screen relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {wishlist.map(game => (
              <div key={game.id} className="game-card bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col h-full">
                {game.background_image ? (
                  <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full min-h-48 bg-gray-600 flex items-center justify-center">
                    <span className="text-white text-sm">No image available</span>
                  </div>
                )}
                <div className="p-4 flex flex-col flex-grow">
                <h3 className="game-name text-lg text-white font-semibold mb-2">{game.name}</h3>
                <div className="flex flex-col space-y-2 mt-auto">
                    <Link 
                    to={`/game/${game.id}`}
                    className="more-info-btn flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
                    >
                    More Info
                    </Link>
                    <button
                    onClick={() => removeFromWishlist(game.id)}
                    className="remove-btn flex justify-center items-center bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
                    >
                    Remove from Wishlist
                    </button>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default WishList;
