import React, { useState, useEffect } from 'react';

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const apiKey = '57155f6ce0c64cb2bd96909d78c76f58';
    const url = `https://api.rawg.io/api/games?key=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setGames(data.results); // Assuming 'results' contains the games data
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []); // The empty array ensures this effect runs only once

  return (
    <div>
      <h1>Games</h1>
      <ul>
        {games.map((game, index) => (
          <li key={index}>{game.name}</li> // Example: Display game names
        ))}
      </ul>
    </div>
  );
};

export default Games;
