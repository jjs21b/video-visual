import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Sidebar from './sidebar';
import GamesDisplay from './ResultsDisplay';
import GameDetails from './GameDetails';
import WishList from './WishList';


const AppContent = () => {
  const location = useLocation(); // Hook to access the current location
  const showHeader = location.pathname === '/';
  // Show header only on the front page
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
  const [loading, setLoading ] = useState(false); // regular loading stae
  const [showTop, setShowTop] = useState(false); // show top navigator
  const [loadingMore, setLoadingMore] = useState(false); // specifically for load more games button


  const [wishlist, setWishlist] = useState(() => {
    // Initialize wishlist from cookies
    const savedWishlist = Cookies.get('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Update cookies whenever the wishlist changes
  useEffect(() => {
      Cookies.set('wishlist', JSON.stringify(wishlist), { expires: 7 });
  }, [wishlist]);

  const addToWishlist = (game) => {
      const updatedWishlist = [...wishlist, game];
      setWishlist(updatedWishlist);
  };

  const removeFromWishlist = (gameId) => {
      const updatedWishlist = wishlist.filter(game => game.id !== gameId);
      setWishlist(updatedWishlist);
  };
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
      setShowTop(false);
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
    setLoadingMore(true);
    try {
      let nextPage = page + 1;
      let url = `${query}&page=${nextPage}`;
      const response = await fetch(url);
      const data = await response.json();
      setGames(prevGames => [...prevGames, ...data.results]);
      setLoadingMore(false);
      setPage(nextPage);
      setShowTop(true);
      console.log(data.results.length)
      //console.log(data.next);
      setMoreGames(data.next !== null);
  
    } catch (error) {
      setLoadingMore(false);
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
          showTop = {showTop} loading = {loading} loadingMore={loadingMore}/>} />
          <Route path="/game/:id" element={<GameDetails setSearchPerformed={setSearchPerformed} addToWishlist={addToWishlist} wishlist={wishlist}/>} />
          <Route path="/wishlist" element={<WishList wishlist={wishlist} removeFromWishlist={removeFromWishlist} 
          setWishlist ={setWishlist} />} />
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
