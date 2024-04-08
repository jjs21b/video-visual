import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;
const fetchGames = async (filters) => {
    try {
      const response = await axios.get('https://api.rawg.io/api/games', {
        params: {
          key: apiKey,
          genres: filters.genre,
          developer: filters.developers,
          metacritic: filters.metacritic,
          // Add more parameters based on the RAWG API documentation
        }
      });
      console.log(response.data.results);
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