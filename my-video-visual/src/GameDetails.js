import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GameDetails = ({setSearchPerformed}) => {
  const handleBackClick = () => {
    setSearchPerformed(true); // Update the searchPerformed state
    navigate('/'); // Navigate back to the main page
  };
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;
  const processDescription = (description) => {
    // Assuming "Descripción en español:" marks the beginning of the Spanish portion
    const delimiter = "Español";
    const parts = description.split(delimiter);
  
    // Return the part before the delimiter if it exists, otherwise return the full description
    return parts.length > 1 ? parts[0].trim() : description;
  };

  useEffect(() => {
    const fetchGameDetails = async () => {
      try{
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
        const data = await response.json();
        setGameDetails(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchGameDetails();
    
    
  }, [id]);

  if (!gameDetails) return <div className = "text-4xl font-bold">Loading...</div>;

  return (
    <div className="game-details p-4 bg-gray-900 text-white">
      <button 
      onClick={handleBackClick}
      className="back-btn mb-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full shadow flex items-center justify-center transition duration-300 ease-in-out"
      >
      <svg className="inline mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
      Back
    </button>
    {/* Game Name */}
    <h1 className="text-4xl text-center font-bold my-4 mt-[-2rem]">{gameDetails.name}</h1>
      {/* Game Images */}
      <div className={`flex ${gameDetails.background_image_additional ? 'justify-start gap-4' : 'justify-center'}`}>
        {gameDetails.background_image && (
          <img src={gameDetails.background_image} alt="Main" className="w-full md:w-1/2 rounded-lg shadow-lg" />
        )}
        {gameDetails.background_image_additional && (
          <img src={gameDetails.background_image_additional} alt="Additional" className="pr-4 hidden md:block w-1/2 rounded-lg shadow-lg" />
        )}
      </div>
      {/* Description */}
      <div className="my-8 mx-4 p-4 border border-gray-700 rounded">
        <h2 className="text-2xl font-bold mb-4">Description:</h2>
        <div dangerouslySetInnerHTML={{ __html: processDescription(gameDetails.description) }} />
      </div>
      
      {/* Official Website Button Centered */}
      {gameDetails.website && (
        <div className="text-center mb-8">
          <a href={gameDetails.website} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
            {gameDetails.name} Official Website
          </a>
        </div>
      )}


      {/* Additional Information */}
      <div className="my-8 mx-4 md:flex md:justify-between border border-gray-700 rounded p-4">
        {/* Left Side Content */}
        <div className="md:w-1/2 md:pr-4">
          <h2 className="text-xl font-bold mb-4">More Information:</h2>
          {/* ESRB Rating */}
          {gameDetails.esrb_rating && (
            <div className="mb-4">
              <span className="font-semibold">ESRB Rating:</span> {gameDetails.esrb_rating.name}
            </div>
          )}
          {/* Release Date */}
          <div className="mb-4">
            <span className="font-semibold">Released:</span> {gameDetails.released}
          </div>
          {/* Metacritic Score */}
          {gameDetails.metacritic && (
            <div className="mb-4">
              <span className="font-semibold">Metacritic Score:</span> {gameDetails.metacritic}
            </div>
          )}
          {/* Rating and Review Count */}
          <div className="mb-4">
            <span className="font-semibold">Rating:</span> {gameDetails.rating} ({gameDetails.ratings_count} reviews)
          </div>
        </div>
        {/* Vertical Divider */}
        <div className="hidden md:block md:w-px bg-gray-700 mx-4"></div>
        {/* Right Side Content */}
        <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
          {/* Platforms */}
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-4">Available On:</h2>
            <ul className="list-disc list-inside">
              {gameDetails.platforms && gameDetails.platforms.map(platform => (
                <li key={platform.platform.id}>{platform.platform.name}</li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </div>
  );
};


export default GameDetails;
