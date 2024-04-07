import axios from 'axios';
const fetchGames = async (filters) => {
    try {
      const response = await axios.get('https://api.rawg.io/api/games', {
        params: {
          key: process.env.REACT_APP_API_KEY,
          genres: filters.genre,
          developer: filters.developers,
          metacritic: filters.metacritic,
          // Add more parameters based on the RAWG API documentation
        }
      });
      
      return response.data.results;
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  };

const fetchDevelopers = async (apiKey) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/developers`, {
      params: {
        key: apiKey,
      },
    });
    return response.data.results; // Adjust based on the actual structure of the API response
  } catch (error) {
    console.error("Error fetching developers:", error);
    return [];
  }
};

const fetchGenres = async (apiKey) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/genres`, {
      params: {
        key: apiKey,
      },
    });
    return response.data.results; // This might need adjustment based on the API response structure
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export {fetchDevelopers, fetchGenres}
export default fetchGames;