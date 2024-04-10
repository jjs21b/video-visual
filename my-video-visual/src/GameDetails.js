import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GameDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchGameDetails = async () => {
      const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
      const data = await response.json();
      setGameDetails(data);
    };

    fetchGameDetails();
  }, [id]);

  if (!gameDetails) return <div>Loading...</div>;

  return (
    <div className="game-details p-4">
      <button 
      onClick={() => navigate('/')}
      className="back-btn mb-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow flex items-center justify-center transition duration-300 ease-in-out"
      >
      <svg className="inline mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      Back
    </button>


      {/* Game Name */}
    <h1 className="text-3xl font-bold mb-2">{gameDetails.name}</h1>
    
    {/* Game Cover Image */}
    {gameDetails.background_image && (
      <img src={gameDetails.background_image} alt={gameDetails.name} className="rounded-lg shadow-lg mb-4" />
    )}
    
    {/* Game Description */}
    <div className="mb-4" dangerouslySetInnerHTML={{ __html: gameDetails.description }} />
    
    {/* Metacritic Score */}
    {gameDetails.metacritic && (
      <div className="mb-2">
        <span className="font-semibold">Metacritic Score:</span> {gameDetails.metacritic}
      </div>
    )}
    
    {/* Release Date */}
    <div className="mb-2">
      <span className="font-semibold">Released:</span> {gameDetails.released}
    </div>
    
    {/* Rating */}
    <div className="mb-2">
      <span className="font-semibold">Rating:</span> {gameDetails.rating} ({gameDetails.ratings_count} reviews)
    </div>
    
    {/* Official Website */}
    {gameDetails.website && (
      <a href={gameDetails.website} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mb-4">
        Official Website
      </a>
    )}
    
    {/* Platforms */}
    <div className="mb-4">
      <span className="font-semibold">Available On:</span>
      <ul className="list-disc list-inside">
        {gameDetails.platforms && gameDetails.platforms.map(platform => (
          <li key={platform.platform.id}>{platform.platform.name}</li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default GameDetails;
