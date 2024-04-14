import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import GamesDisplay from './ResultsDisplay';
import GameDetails from './GameDetails';

const AppContent = () => {
  const location = useLocation(); // Hook to access the current location
  const showHeader = !location.pathname.startsWith('/game/'); // Show header only on the front page
  const [games, setGames] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const hasResults = games.length > 0; // Check if there are any games in the state
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedDeveloper, setSelectedDeveloper] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('')
  const [score, setScore] = useState('');
  const [page, setPage] = useState(1)
  const [title, setTitle]=useState('');
  const [moreGames, setMoreGames] = useState(false)
  const [query, setQuery] = useState('')
  const [loading, setLoading ] = useState(false);
  const apiKey = process.env.REACT_APP_API_KEY;

  const fetchInitialGames = async () => {
    let url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=40`;
    const response = await fetch(url);
    const data = await response.json();
    setGames(data.results);
    setMoreGames(true);
    setQuery(url);
    
  };
  // Fetch games based on selected genre and developer
  const fetchGames = async () => {
    setLoading(true);
    try {
      let url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=40`;
      if (selectedGenre) url += `&genres=${selectedGenre}`;
      if (selectedDeveloper) url += `&developers=${selectedDeveloper}`;
      if (score) url += `&metacritic=${score},100`;
      if (selectedPlatform) url += `&platforms=${selectedPlatform}`;
      if (title) url += `&search=${title}`;
      const response = await fetch(url);
      const data = await response.json();
      setGames(data.results);
      setSearchPerformed(true);
      setLoading(false);  // Stop loading after data is fetched
      setQuery(url);
      setPage(1);
      // console.log(data.next)
      setMoreGames(data.next !== null);
    } catch (error) {
      console.error("Error fetching games:", error);
      setLoading(false);
    }
  };
  const loadMoreGames = async () => {
    setLoading(true);
    try {
      let nextPage = page + 1;
      let url = `${query}&page=${nextPage}`;
      const response = await fetch(url);
      const data = await response.json();
      setGames(prevGames => [...prevGames, ...data.results]);
      setLoading(false);
      setPage(nextPage);
      console.log(data.results.length)
      //console.log(data.next);
      setMoreGames(data.next !== null);
  
    } catch (error) {
      setLoading(false);
      console.error("Error fetching more games:", error);
    }
  };


  useEffect(() => {
    if (searchPerformed == false){
      fetchInitialGames();
    }
    
  }, []); // Empty dependency array to run only on component mount

  return (
    <div className="app flex min-h-screen bg-gray-800 text-white">
      {showHeader && ( 
        <div className="sidebar w-64"> {/* Adjust width as needed */}
          <Sidebar  setScore = {setScore} score = {score} setSelectedGenre = {setSelectedGenre} selectedGenre = {selectedGenre} 
          setSelectedDeveloper = {setSelectedDeveloper} selectedDeveloper = {selectedDeveloper} setSelectedPlatform = 
          {setSelectedPlatform} selectedPlatform = {selectedPlatform} fetchGames = {fetchGames} searchPerformed = {searchPerformed}
           setTitle = {setTitle} title = {title}/>
        </div>
      )}

       {/* Main Content Area */}
       <div className="flex-grow">
        {/* Conditionally render "Search Results" text only if search has been performed and there are results */}
        {searchPerformed && showHeader && hasResults && (
          <header className="banner text-center py-5 bg-blue-900 shadow-xl mx-8">
            <h1 className="text-3xl font-bold" >
              Results 
            </h1>
          </header>
        )}
        {searchPerformed && showHeader && !hasResults && (
          <header className="w-full py-8 text-center">
            <h1 className="text-2xl font-bold">
              No Results Found
            </h1>
          </header>
        )}
         {!searchPerformed && showHeader && (
          <header className="banner text-center py-4 bg-blue-900 shadow-xl mx-8">
            <h1 className="text-4xl font-bold">
              Find The Game That's Right For You!
            </h1>
          </header>
        )}
        {/* Routes */}
        <Routes>
          <Route path="/" element={<GamesDisplay games={games} loadMoreGames = {loadMoreGames} moreGames = {moreGames}
          loading = {loading}/>} />
          <Route path="/game/:id" element={<GameDetails setSearchPerformed={setSearchPerformed}/>} />
        </Routes>
      </div>
    </div>
  );
}


const App = () => {

  return (
    <Router basename='/video-visual'>
      <AppContent />
    </Router>
  );
};

export default App;
