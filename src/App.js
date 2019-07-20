import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchStarshipsAction } from './actions/dataActions';

const App = () => {

  const starships = useSelector(state => state.starships);
  const loading = useSelector(state => state.loading);
  const starshipsNextPage = useSelector(state => state.starshipsNextPage);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>SW Shipping</h1>
      <h2>Our Fleet</h2>
      <ul>
      {starships.length ? starships.map(starship => <li key={starship.id}>{starship.name}</li>) : <p>&nbsp;</p>}

        {loading ? (
          <p>Loading...</p>
        ) : (starshipsNextPage ? <button onClick={() => {dispatch(fetchStarshipsAction())}}>Fetch</button> : <p>No More Starships</p>)
        }
      </ul>

    </div>
  );
}

export default App;