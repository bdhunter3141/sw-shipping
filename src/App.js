import React, { useState, useEffect } from "react";
import uuid from "uuid/v1";
import { useSelector, useDispatch } from 'react-redux';
import { fetchStarshipsAction } from './actions/dataActions';

const App = () => {

  const starships = useSelector(state => state.starships);
  const loading = useSelector(state => state.loading);

  const fetchStarships = useDispatch(() => fetchStarshipsAction());
  // const [starships, setStarships] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const getStarships = () => {
  //   setLoading(true);
  //   fetch("https://swapi.co/api/starships")
  //     .then(response => response.json())
  //     .then(starshipJson => {
  //       addStarships(starshipJson);
  //     });
  // }

  // const addStarships = starshipJson => {    
  //   const starshipList = [];
  //   starshipJson.results.forEach(starship => {
  //     starshipList.push({ name: starship.name, id: uuid() });
  //   });
  //   setStarships([...starships, ...starshipList]);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   if (!starships.length) {
  //     getStarships();
  //   }
  // });

  return (
    <div className="App">
      <h1>SW Shipping</h1>
      <h2>Our Fleet</h2>
      <ul>
        {loading ? (
          <p>Loading...</p>
        ) : (
          starships.map(starship => <li key={starship.id}>{starship.name}</li>)
        )}
      </ul>
      <button onClick={fetchStarships}>Fetch</button>
    </div>
  );
}

export default App;