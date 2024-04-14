import React, { useState, useEffect,  } from 'react';
import { useLocation } from 'react-router-dom';

const Sidebar = ({ setScore, score, setSelectedGenre, selectedGenre, setSelectedDeveloper, selectedDeveloper
,setSelectedPlatform, selectedPlatform, fetchGames, searchPerformed, setTitle, title}) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  //const [numberResults, setNumberResults] = useState(20);
  const location = useLocation();
  const showSearch = !location.pathname.startsWith('/game/');
  const defaultGenre = '';
  const defaultDeveloper = '';
  const defaultPlatform = '';
  const defaultScore = '';
  const defaultTitle = '';

  const resetSearchOptions = () => {
    setSelectedGenre(defaultGenre);
    setSelectedDeveloper(defaultDeveloper);
    setSelectedPlatform(defaultPlatform);
    setScore(defaultScore);
    setTitle(defaultTitle)
  // Fetch genres
  }
  const fetchGenres = async () => {
    try{
      const response = await fetch(`https://api.rawg.io/api/genres?key=${apiKey}`);
      const data = await response.json();
      const sortedGenres = data.results.sort((a, b) => a.name.localeCompare(b.name));
      setGenres(sortedGenres);
    }
    catch(error) {
      console.error("Error fetching games:", error);
    }
  };
  
  // Fetch developers
  const fetchDevelopers = async () => {
    try{
      const response = await fetch(`https://api.rawg.io/api/developers?key=${apiKey}`);
      const data = await response.json();
      const sortedDevelopers = data.results.sort((a, b) => a.name.localeCompare(b.name));
      setDevelopers(sortedDevelopers);
    }   
    catch(error) {
      console.error("Error fetching games:", error);
    }
  };
  
  // fetch parent platforms
  const fetchPlatforms = async () => {
    try {
      const response = await fetch(`https://api.rawg.io/api/platforms?key=${apiKey}`);
      const data = await response.json();
      // Using a comparison function for reverse alphabetical sorting
      const sortedPlatforms = data.results.sort((a, b) => {
        if (a.name < b.name) {
          return 1; // For reverse alphabetical order, return 1 when a is less than b
        }
        if (a.name > b.name) {
          return -1; // Return -1 when a is greater than b
        }
        return 0; // Return 0 if they're equal
      });
      setPlatforms(sortedPlatforms);
    }catch(error) {
      console.error("Error fetching games:", error);
    }
  };
  

  // Call fetch functions when the component mounts
  useEffect(() => {
    //console.log('Sidebar is mounting');
    fetchGenres();
    fetchPlatforms();
    fetchDevelopers();
  
  }, []);
  

  return (
    <div className="p-4 min-w-64 bg-gray-800 text-white h-screen overflow-y-auto">
      {/* Text above Sidebar */}
      <div className="w-full py-4 text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Search Criteria
        </h2>
    </div>
      {/* Title Input */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-bold mb-2">Title:</label>
        <input
          id="title"
          type="text"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      {/* Genre Dropdown */}
      <div className="mb-4">
        <label htmlFor="genre-select" className="block text-sm font-bold mb-2">Genre:</label>
        <select
          id="genre-select"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-2"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Any</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      {/* Platform dropdown */}
      <div className="mb-4">
        <label htmlFor="platform-select" className="block text-sm font-bold mb-2">Platform:</label>
        <select
          id="platform-select"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-2"
          value={selectedPlatform}
          onChange={(e) => setSelectedPlatform(e.target.value)}
        >
          <option value="">Any</option>
          {platforms.map(platform => (
            <option key={platform.id} value={platform.id}>{platform.name}</option>
          ))}
        </select>
      </div>
      
      {/* Developer Dropdown */}
      <div className="mb-4">
        <label htmlFor="developer-select" className="block text-sm font-bold mb-2">Developer:</label>
        <select
          id="developer-select"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-2"
          value={selectedDeveloper}
          onChange={(e) => setSelectedDeveloper(e.target.value)}>
          <option value="">Any</option>
          {developers.map(developer => (
            <option key={developer.id} value={developer.id}>{developer.name}</option>
          ))}
        </select>
      </div>
      
      {/* Metacritic Score Input */}
      <div className="mb-4">
        <label htmlFor="metacritic-score" className="block text-sm font-bold mb-2">Metacritic Score (1-100):</label>
        <input
          id="metacritic-score"
          type="number"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-2"
          min="1"
          max="100"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </div>
      
        
      {/* Number of results dropdown 
      <div className="mb-4">
        <label htmlFor="result-number" className="block text-sm font-bold mb-2">Display Results (1-40):</label>
        <input
          id="result-number"
          type="number"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-2"
          min="1"
          max="40"
          value={numberResults}
          onChange={(e) => setNumberResults(e.target.value)}
        />
      </div>
    */}
      {/* Search Button */}
      {showSearch && !searchPerformed && (
      <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchGames}>
        Search Games</button>
      )}
      {showSearch && searchPerformed &&
      (
        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchGames}>
        Perform New Search</button>
      )}
      <button onClick={resetSearchOptions} className="w-full mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        Reset Search Criteria
      </button>
      </div>
    

  );
};

export default Sidebar;
