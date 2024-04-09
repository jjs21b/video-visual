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
        className="back-btn mb-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow transition duration-300 ease-in-out"
      >
        <svg className="inline mr-2 -ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        Back
      </button>

      <h1 className="mb-4">{gameDetails.name}</h1>
      {console.log(gameDetails)}
      {/* Display more game details */}
    </div>
  );
};

export default GameDetails;
