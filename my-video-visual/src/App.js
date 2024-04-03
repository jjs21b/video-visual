import './App.css';
import React from 'react';
import GameReleasesChart from './GameReleasesChart'; // Make sure the path is correct

function App() {
  return (
    <div className="App">
      <GameReleasesChart year={2022}/>
    </div>
  );
}

export default App;
