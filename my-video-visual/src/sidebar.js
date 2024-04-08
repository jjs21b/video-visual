import React, { useState, useEffect } from 'react';
import { fetchGenres, fetchDevelopers } from './api'; // Adjust the import path as needed

const Sidebar = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
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
  
  // Fetch games based on selected genre and developer
  const fetchGames = async () => {
    let url = `https://api.rawg.io/api/games?key=${apiKey}`;
    if (selectedGenre) url += `&genres=${selectedGenre}`;
    if (selectedDeveloper) url += `&developers=${selectedDeveloper}`;
    if (score > 0) url += `&metacritic=${score},100`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data.results); // For now, just log the fetched games to the console
  };


  // Call fetch functions when the component mounts
  useEffect(() => {
    fetchGenres();
    fetchDevelopers();
  }, []);
  
  useEffect(() => {
    if (selectedGenre || selectedDeveloper || score > 0) {
      fetchGames();
    }
  }, [selectedGenre, selectedDeveloper, score]);

  return (
    <div>
      {/* Genre Dropdown */}
      <div>
        <label htmlFor="genre-select">Genre:</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Select a Genre</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      {/* Developer Dropdown */}
      <div>
        <label htmlFor="developer-select">Developer:</label>
        <select
          id="developer-select"
          value={selectedDeveloper}
          onChange={(e) => setSelectedDeveloper(e.target.value)}
        >
          <option value="">Select a Developer</option>
          {developers.map(developer => (
            <option key={developer.id} value={developer.id}>{developer.name}</option>
          ))}
        </select>
      </div>
      {/* Metacritic Score Input */}
      <div>
        <label htmlFor="metacritic-score">Metacritic Score (1-100):</label>
        <input
          id="metacritic-score"
          type="number"
          min="1"
          max="100"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
      </div>
    </div>
    
  );
};

export default Sidebar;
