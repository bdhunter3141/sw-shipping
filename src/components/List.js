import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStarshipsAction,
  fetchCharacterAction
} from "../actions/dataActions";

const List = () => {
  const starships = useSelector(state => state.starships);
  const starshipsNextPage = useSelector(state => state.starshipsNextPage);
  const characters = useSelector(state => state.characters);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();
  const [characterId, setCharacterId] = useState(0);

  useEffect(() => {
    if (starships.length && characters.length / starships.length <= 0.2) {
      dispatch(fetchCharacterAction(characterId));
      setCharacterId(() => {return characterId + 1})
    }
  }, [dispatch, characterId, characters.length, starships.length]);

  useEffect(() => {
    dispatch(fetchStarshipsAction());
  }, [dispatch]);

  useEffect(() => {

    function handleScroll() {
      if (
        document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.scrollHeight &&
        starshipsNextPage
      ) {
        dispatch(fetchStarshipsAction());
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dispatch, starshipsNextPage]);

  return (
    <div id="list-container">
      <h2>Our Fleet</h2>
      {starships.length ? (
        starships.map((starship, i) => {
          const starshipId = starship.url.split('/')[5];
          if (i % 8 === 0 && i !== 0) {
            let characterInfo = characters[i / 8 - 1] || "";
            return (
              <div key={starship.id}>
                <div className="character-list-item">Meet {characterInfo.name}, one of our pilots! Born in {characterInfo.birth_year}, they are {characterInfo.height} cm tall and weigh {characterInfo.mass} kg.</div>
                <div className="starship-list-item"><div><Link to={`/starships/${starshipId}`}>{starship.name}</Link></div><div>{starship.model} | {starship.manufacturer}</div></div>
              </div>
            );
          } else {
            return (
              <div key={starship.id} className="starship-list-item">
                <div><Link to={`/starships/${starshipId}`}>{starship.name}</Link></div> <div>{starship.model} | {starship.manufacturer}</div>
              </div>
            );
          }
        })
      ) : (
        <p>&nbsp;</p>
      )}

      {loading && "Fetching more list items..."}

    </div>
  );
};

export default List;
