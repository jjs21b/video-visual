import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';

const GameReleasesChart = ({ year }) => {
  const [gameReleases, setGameReleases] = useState([]);

  useEffect(() => {
    const fetchGameReleases = async () => {
      // Adjust the API call as needed based on RAWG's documentation
      const response = await axios.get(`https://api.rawg.io/api/games?key=57155f6ce0c64cb2bd96909d78c76f58&dates=${year}-01-01,${year}-12-31&ordering=-released`);
      const monthlyData = aggregateDataByMonth(response.data.results);
      setGameReleases(monthlyData);
    };

    fetchGameReleases();
  }, [year]);

  // Function to aggregate game releases by month
  const aggregateDataByMonth = (games) => {
    const monthlyCounts = {};
    games.forEach((game) => {
      const month = new Date(game.released).getMonth();
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });
    return Object.entries(monthlyCounts).map(([month, count]) => ({
      month: new Date(0, month).toLocaleString('default', { month: 'short' }),
      releases: count,
    }));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Game Releases in {year}</h2>
      <BarChart width={600} height={300} data={gameReleases}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="releases" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default GameReleasesChart;
