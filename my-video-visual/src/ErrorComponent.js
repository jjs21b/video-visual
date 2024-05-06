import React, { useContext } from 'react';
import { ErrorContext } from './ErrorHandler'; // Ensure this import is correct

const ErrorHandlerComponent = () => {
  const { error, clearError } = useContext(ErrorContext);

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <h1 className="text-xl font-semibold text-red-500 mb-4">An error has occurred</h1>
          <p className="mb-4">Unfortunately, there was an error processing your request. Please try refreshing the page, or check the API status for more details.</p>
          <div className="flex justify-around">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Refresh Page
            </button>
            <button 
              onClick={clearError} 
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Dismiss
            </button>
            <a 
              href="https://www.saashub.com/rawg-status"
              target="_blank" // Ensures that the link opens in a new tab
              rel="noopener noreferrer" // Security measure for opening links in new tabs
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Check API Status
            </a>
          </div>
        </div>
      </div>
    );
  }

  return null; // If there's no error, nothing needs to be rendered
};

export default ErrorHandlerComponent;
