// GameDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GameDetails = () => {
  const { id } = useParams(); // Get the game ID from URL parameters
  const [gameDetails, setGameDetails] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;


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
    <div className="game-details">
      {/* Display the game details */}
      <h1>{gameDetails.name}</h1>
      {/* Add more details as needed */}
    </div>
  );
};

export default GameDetails;
