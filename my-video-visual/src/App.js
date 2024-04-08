import './App.css';
import React, { useState , useEffect} from 'react';
import ResultsDisplay from './ResultsDisplay'; // Make sure the path is correct
import Sidebar from './sidebar';
import fetchGames from './api'


const App = () => {

  return (
    <div className="app">
      <Sidebar/>
    </div>
  );
};


export default App;
