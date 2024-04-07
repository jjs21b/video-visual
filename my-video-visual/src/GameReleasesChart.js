import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

// This function is defined outside of the component because it doesn't rely on any state or props.
const fetchGamesByYear = async (year, apiKey) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: apiKey,
        dates: `${year}-01-01,${year}-12-31`,
        ordering: '-released'
      }
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching games data:", error);
    return [];
  }
};

// Function to aggregate game releases by month, also outside because it's a pure function.
const aggregateDataByMonth = (games) => {
  console.log(games); // Check the game data format

  const monthlyCounts = Array.from({ length: 12 }, () => 0);

  games.forEach(game => {
    console.log(game.released); // Check the 'released' date format for each game
    const releaseDate = new Date(game.released)
    console.log(releaseDate); // Verify the parsed date

    const month = releaseDate.getMonth();
    console.log(month); // Log the month to ensure it's correct

    monthlyCounts[month]++;
  });

  console.log(monthlyCounts); // Verify the counts for each month

  return monthlyCounts.map((count, index) => ({
    month: new Date(2000, index).toLocaleString('default', { month: 'short' }),
    releases: count,
  }));
};

const GameReleasesChart = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [gameReleases, setGameReleases] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY; // Ensure this matches the .env variable

  // Fetch game releases when 'selectedYear' changes.
  useEffect(() => {
    if (apiKey) {
      fetchGamesByYear(selectedYear, apiKey).then(data => {
        const monthlyData = aggregateDataByMonth(data);
        setGameReleases(monthlyData);
      });
    }
  }, [selectedYear, apiKey]);

  // Dropdown options for years
  const yearsOptions = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  // Event handler for changing the selected year
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <div className="game-releases-chart">
      <h2>Game Releases Chart</h2>
      <label htmlFor="year-select">Choose a year:</label>
      <select
        id="year-select"
        value={selectedYear}
        onChange={handleYearChange}
      >
        {yearsOptions.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <BarChart width={730} height={250} data={gameReleases}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="releases" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default GameReleasesChart;
