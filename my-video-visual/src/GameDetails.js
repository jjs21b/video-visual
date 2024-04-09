// GameDetails.js
import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { useParams } from 'react-router-dom';
=======
import { useParams, useNavigate } from 'react-router-dom';
>>>>>>> b12854304b67c059caaad5b17054a8242fb7b56b

const GameDetails = () => {
  const { id } = useParams(); // Get the game ID from URL parameters
  const [gameDetails, setGameDetails] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
<<<<<<< HEAD

=======
  const navigate = useNavigate();
>>>>>>> b12854304b67c059caaad5b17054a8242fb7b56b

  useEffect(() => {
    // Replace with your actual API call logic
    const fetchGameDetails = async () => {
      // Construct the URL using the game ID
      const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
      const data = await response.json();
      console.log(data);
      setGameDetails(data);
    };

    fetchGameDetails();
  }, [id]); // Re-run the effect if the ID changes

  if (!gameDetails) return <div>Loading...</div>; // Show a loading message while data is being fetched

  return (
<<<<<<< HEAD
    <div className="game-details">
      {/* Display the game details */}
      <h1>{gameDetails.name}</h1>
      {/* Add more details as needed */}
=======
    
    <div className="game-details">
      {/* Tailwind CSS styled Back button */}
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded-full shadow-lg mb-4"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Return to Search
      </button>
      {/* Display the game details */}
      <h1>{gameDetails.name}</h1>
      <h2>{gameDetails.website}</h2>
>>>>>>> b12854304b67c059caaad5b17054a8242fb7b56b
    </div>
  );
};

export default GameDetails;
