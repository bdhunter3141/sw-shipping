import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStarshipsAction,
  fetchCharacterCountAction,
  fetchCharacterAction
} from "./actions/dataActions";

const App = () => {
  const starships = useSelector(state => state.starships);
  const loading = useSelector(state => state.loading);
  const starshipsNextPage = useSelector(state => state.starshipsNextPage);
  const characterCount = useSelector(state => state.characterCount);
  const characters = useSelector(state => state.characters);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!characterCount) {
      dispatch(fetchCharacterCountAction());
    }
    if (characters.length / starships.length <= 0.2) {
      dispatch(fetchCharacterAction());
    }
  });

  return (
    <div className="App">
      <h1>SW Shipping</h1>
      <h2>Our Fleet</h2>
      <div>
        {starships.length ? (
          starships.map((starship, i) => {
            if (i % 8 === 0 && i !== 0) {
              let characterInfo = characters[i / 8 - 1] || "";
              return (
                <div key={starship.id}>
                  <div className='character-list-item'>{characterInfo.name}</div>
                  <div className='starship-list-item'>{starship.name}</div>
                </div>
              );
            } else {
              return <div key={starship.id} className='starship-list-item'>{starship.name}</div>;
            }
          })
        ) : (
          <p>&nbsp;</p>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : starshipsNextPage ? (
          <button
            onClick={() => {
              dispatch(fetchStarshipsAction());
            }}
          >
            Fetch
          </button>
        ) : (
          <p>No More Starships</p>
        )}
      </div>
    </div>
  );
};

export default App;
