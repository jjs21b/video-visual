import { Link } from 'react-router-dom';

const WishList = ({ wishlist, removeFromWishlist, setWishlist }) => {
  const clearWishlist = () => {
    setWishlist([]); // Clear the wishlist state
    localStorage.removeItem('wishlist'); // Clear the wishlist from local storage
  };

  return (
    <div className="wishlist-container p-4 bg-gradient-to-r from-gray-700 to-gray-900 min-h-screen">
      <div className="flex items-center justify-between p-4 shadow-md">
        <Link to="/" className="flex items-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded duration-300 ease-in-out">
          <svg className="mr-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Homepage
        </Link>
        <h2 className="text-4xl font-bold text-white">Your Wishlist</h2>
        <button onClick={clearWishlist} className="flex items-center bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">
          <svg className="mr-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          Clear Wishlist
        </button>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {wishlist.map(game => (
          <div key={game.id} className="game-card bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out flex flex-col h-full">
            {game.background_image ? (
              <img src={game.background_image} alt={game.name} className="w-full h-48 object-cover" />
            ) : (
              <div className="w-full min-h-48 bg-gray-600 flex items-center justify-center">
                <span className="text-white text-sm">No image available</span>
              </div>
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="game-name text-lg text-white font-semibold mb-2">{game.name}</h3>
              <div className="flex flex-col space-y-2 mt-auto">
                <Link 
                  to={`/game/${game.id}`}
                  className="more-info-btn flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  More Info
                </Link>
                <button
                  onClick={() => removeFromWishlist(game.id)}
                  className="remove-btn flex justify-center items-center bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishList;
