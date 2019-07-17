import React, { useState } from 'react';


function App() {
  const [starships, setStarships] = useState([{name: "Millenium Falcon", id: 1}, {name: "Executor", id: 2}, {name: "Sentinel-class landing craft", id: 3},]);

  return (
    <div className='App'>
      <h1>SW Shipping</h1>
      <h2>Our Fleet</h2>
      <ul>
      {starships.map(starship => (<li key={starship.id}>{starship.name}</li>))}
      </ul>
    </div>
  );
}

export default App;
