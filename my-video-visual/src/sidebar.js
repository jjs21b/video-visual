import React, { useState, useEffect } from 'react';
import { fetchGenres, fetchDevelopers } from './api'; // Adjust the import path as needed

const Sidebar = ({ onFiltersChange }) => {
  const [genres, setGenres] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [genre, setGenre] = useState('');
  const [developer, setDeveloper] = useState('');
  const [metascore, setMetascore] = useState('');
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    fetchGenres(apiKey).then(setGenres);
    fetchDevelopers(apiKey).then(setDevelopers);
  }, [apiKey]);

  const handleFilterChange = () => {
    onFiltersChange({ genre, developer, metascore });
  };

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-5">
      <h2 className="text-xl font-bold mb-5">Filters</h2>
      {/* Genre Filter */}
      <div className="mb-4">
        <label htmlFor="genre" className="block mb-2">Genre</label>
        <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="w-full bg-gray-700 p-2 rounded">
          <option value="">Select Genre</option>
          {genres.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </div>
      {/* Developer Filter */}
      <div className="mb-4">
        <label htmlFor="developer" className="block mb-2">Developer</label>
        <select id="developer" value={developer} onChange={(e) => setDeveloper(e.target.value)} className="w-full bg-gray-700 p-2 rounded">
          <option value="">Select Developer</option>
          {developers.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>
      {/* Metascore Filter */}
      <div className="mb-4">
        <label htmlFor="metascore" className="block mb-2">Metascore</label>
        <input type="number" id="metascore" value={metascore} onChange={(e) => setMetascore(e.target.value)} className="w-full bg-gray-700 p-2 rounded" />
      </div>
      {/* Apply Filters Button */}
      <button onClick={handleFilterChange} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Apply Filters
      </button>
    </div>
  );
};

export default Sidebar;
