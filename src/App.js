import React from 'react';
import './App.css';
import Home from './pages/Home';
import PlanetsProv from './Context/PlanetsProv';

function App() {
  return (
    <PlanetsProv>
      <Home />
    </PlanetsProv>
  );
}

export default App;
