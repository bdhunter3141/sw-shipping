import React, { useState, useEffect } from "react";
import uuid from "uuid/v1";

function App() {
  const [starships, setStarships] = useState([]);
  const addStarships = starshipJson => {
    const starshipList = [];
    starshipJson.results.forEach(starship => {
      starshipList.push({ name: starship.name, id: uuid() });
    });
    setStarships([...starships, ...starshipList]);
  };

  useEffect(() => {
    if (!starships.length) {
      fetch("https://swapi.co/api/starships")
        .then(response => response.json())
        .then(starshipJson => {
          addStarships(starshipJson);
        });
    }
  });

  return (
    <div className="App">
      <h1>SW Shipping</h1>
      <h2>Our Fleet</h2>
      <ul>
        {starships.length ? (
          starships.map(starship => <li key={starship.id}>{starship.name}</li>)
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}

export default App;
