import React, { useState, useEffect, useContext } from 'react';
import { ErrorContext } from './ErrorHandler';

const Sidebar = ({ setScore, score, setSelectedGenre, selectedGenre, setSelectedDeveloper, selectedDeveloper
,setSelectedPlatform, selectedPlatform, fetchGames, searchPerformed, setTitle, title, fetchInitialGames}) => {
  const {handleError} = useContext(ErrorContext);
  const apiKey = process.env.REACT_APP_API_KEY;
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  //const [numberResults, setNumberResults] = useState(20);
  //const location = useLocation();
  //const showSearch = location.pathname === '/';
  const defaultGenre = '';
  const defaultDeveloper = '';
  const defaultPlatform = '';
  const defaultScore = '';
  const defaultTitle = '';
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        fetchGames();
    }
  };
  const resetSearchOptions = () => {
    setSelectedGenre(defaultGenre);
    setSelectedDeveloper(defaultDeveloper);
    setSelectedPlatform(defaultPlatform);
    setScore(defaultScore);
    setTitle(defaultTitle);
    fetchInitialGames();
  // Fetch genres
  }

  const fetchGenres = async () => {
    let attempts = 0;
    const maxAttempts = 5;
    let success = false;
    while (attempts < maxAttempts && !success) {
      try {
        const response = await fetch(`https://api.rawg.io/api/genres?key=${apiKey}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setGenres(data.results.sort((a, b) => a.name.localeCompare(b.name)));
        success = true; // break the loop on success
      } catch (error) {
        console.error("Attempt to fetch genres failed:", error);
        attempts++;
        if (attempts >= maxAttempts) {
          handleError(error.message);
          break
        }
      }
    }
  };
  
  // Fetch developers
  const fetchDevelopers = async () => {
    let attempts = 0;
    const maxAttempts = 5;
    let success = false;
    while (attempts < maxAttempts && !success) {
      try {
        const response = await fetch(`https://api.rawg.io/api/developers?key=${apiKey}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setDevelopers(data.results.sort((a, b) => a.name.localeCompare(b.name)));
        success = true;
      } catch (error) {
        console.error("Attempt to fetch developers failed:", error);
        attempts++;
        if (attempts >= maxAttempts) {
          handleError(error.message);
          break; // Exit loop after the last attempt
        }
      }
    }
  };
  
  
  const fetchPlatforms = async () => {
    let attempts = 0;
    const maxAttempts = 5;
    let success = false;
    while (attempts < maxAttempts && !success) {
      try {
        const response = await fetch(`https://api.rawg.io/api/platforms?key=${apiKey}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        // Sorting platforms in reverse alphabetical order as originally intended
        setPlatforms(data.results.sort((a, b) => b.name.localeCompare(a.name)));
        success = true; // break the loop on success
      } catch (error) {
        console.error("Attempt to fetch platforms failed:", error);
        attempts++;
        if (attempts >= maxAttempts) {
          handleError(error.message);
          break; // Exit loop after the last attempt
        }
      }
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
    <div className="p-3 pr-6 min-w-64 bg-gray-800 text-white h-screen overflow-y-auto">
      {/* Text above Sidebar */}
      <div className="w-full text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          Search Criteria
        </h2>
      </div>
      {/* Title Input */}
      <div className="mt-5 mb-1">
        <label htmlFor="title" className="block text-sm font-bold mb-2">Keywords:</label>
        <input
          id="title"
          type="text"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-1.5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key press
        />
      </div>
      {/* Genre Dropdown */}
      <div className="mb-1">
        <label htmlFor="genre-select" className="block text-sm font-bold mb-2">Genre:</label>
        <select
          id="genre-select"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-1.5"
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
      <div className="mb-1">
        <label htmlFor="platform-select" className="block text-sm font-bold mb-2">Platform:</label>
        <select
          id="platform-select"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-1.5"
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
      <div className="mb-1">
        <label htmlFor="developer-select" className="block text-sm font-bold mb-2">Developer:</label>
        <select
          id="developer-select"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-1.5"
          value={selectedDeveloper}
          onChange={(e) => setSelectedDeveloper(e.target.value)}>
          <option value="">Any</option>
          {developers.map(developer => (
            <option key={developer.id} value={developer.id}>{developer.name}</option>
          ))}
        </select>
      </div>
      
      {/* Metacritic Score Input */}
      <div className="mb-1">
        <label htmlFor="metacritic-score" className="block text-sm font-bold mb-2">Metacritic Score (1-100):</label>
        <input
          id="metacritic-score"
          type="number"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-1.5"
          min="1"
          max="100"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          onKeyDown={handleKeyPress} // Handle Enter key press
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
      {!searchPerformed && (
      <button className="w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchGames}>
        Search Games</button>
      )}
      {searchPerformed &&
      (
        <button className="w-full bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchGames}>
        Perform New Search</button>
      )}
      {searchPerformed && (
      <button onClick={resetSearchOptions} className="w-full mt-4 bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
        Reset Search Criteria
      </button>
      )}
      </div>
    

  );
};

export default Sidebar;
