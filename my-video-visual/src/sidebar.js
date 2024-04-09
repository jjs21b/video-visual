import React, { useState, useEffect } from 'react';

const Sidebar = ({ setGames }) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [score, setScore] = useState(0);
  
  // Fetch genres
  const fetchGenres = async () => {
    const response = await fetch(`https://api.rawg.io/api/genres?key=${apiKey}`);
    const data = await response.json();
    const sortedGenres = data.results.sort((a, b) => a.name.localeCompare(b.name));
    setGenres(sortedGenres);
  };
  
  // Fetch developers
  const fetchDevelopers = async () => {
    const response = await fetch(`https://api.rawg.io/api/developers?key=${apiKey}`);
    const data = await response.json();
    const sortedDevelopers = data.results.sort((a, b) => a.name.localeCompare(b.name));
    setDevelopers(sortedDevelopers);
  };
  
  // fetch parent platforms
  const fetchPlatforms = async () => {
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
  };
  
  
  
  
  // Fetch games based on selected genre and developer
  const fetchGames = async () => {
    try {
      let url = `https://api.rawg.io/api/games?key=${apiKey}`;
      if (selectedGenre) url += `&genres=${selectedGenre}`;
      if (selectedDeveloper) url += `&developers=${selectedDeveloper}`;
      if (score > 0) url += `&metacritic=${score},100`;
      if (selectedPlatform) url += `&platforms=${selectedPlatform}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.results); // For now, just log the fetched games to the console
      setGames(data.results);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
    
  };


  // Call fetch functions when the component mounts
  useEffect(() => {
    fetchGenres();
    fetchPlatforms();
    fetchDevelopers();
  }, []);
  

  return (
    <div className="p-4 w-64 bg-gray-800 text-white h-page overflow-y-auto">
      {/* Genre Dropdown */}
      <div className="mb-4">
        <label htmlFor="genre-select" className="block text-sm font-bold mb-2">Genre:</label>
        <select
          id="genre-select"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded p-2"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Select a Genre</option>
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
          <option value="">Select a Platform</option>
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
          <option value="">Select a Developer</option>
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

      {/* Search Button */}
      <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchGames}>Search Games</button>
    </div>

  );
};

export default Sidebar;
