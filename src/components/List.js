import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStarshipsAction,
  fetchCharacterAction
} from "../actions/dataActions";

const List = () => {

  // Define all constants
  const starships = useSelector(state => state.starships);
  const starshipsNextPage = useSelector(state => state.starshipsNextPage);
  const characters = useSelector(state => state.characters);
  const loading = useSelector(state => state.loading);
  const dispatch = useDispatch();
  const [characterId, setCharacterId] = useState(0);

  // Check if number of Starships is greater than 8, and if so, fetch a character
  useEffect(() => {
    if (starships.length && characters.length / starships.length <= 0.2) {
      dispatch(fetchCharacterAction(characterId));
      setCharacterId(() => { return characterId + 1 })
    }
  }, [dispatch, characterId, characters.length, starships.length]);

  // Initial load of Starships
  useEffect(() => {
    dispatch(fetchStarshipsAction());
  }, [dispatch]);

  // Handle pagination by scrolling --- if page is scrolled to bottom, fetch more Starships
  useEffect(() => {
    if (loading) {
      return;
    }

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
  }, [dispatch, starshipsNextPage, loading]);

  return (
    <div id="list-container">
      <div className="collection">
        <div className="collection-header"><h4 className="light-blue-text text-darken-3">Our Fleet</h4></div>

        {/* Map Starships and Characters */}
        {starships.length ? (
          starships.map((starship, i) => {
            const starshipId = starship.url.split('/')[5];

            // Add character every 8th Starship
            if (i % 8 === 0 && i !== 0) {
              let characterInfo = characters[i / 8 - 1] || "";
              return (
                <div key={starship.id}>
                  <div className="character-list-item collection-item grey lighten-1 white-text"><i className="fas fa-user-astronaut square white grey-text"></i><div>Meet {characterInfo.name}, one of our pilots!<br />Born in {characterInfo.birth_year}, they are {characterInfo.height} cm tall and weigh {characterInfo.mass} kg.</div></div>
                  <div className="starship-list-item collection-item"><i className="fas fa-rocket circle light-blue darken-1"></i><div><div><Link to={`/starships/${starshipId}`}>{starship.name}</Link></div><div>{starship.model} | {starship.manufacturer}</div></div></div>
                </div>
              );
            } else {
              return (
                <div key={starship.id} className="starship-list-item collection-item">
                  <i className="fas fa-rocket circle light-blue darken-1"></i><div><div><Link to={`/starships/${starshipId}`}>{starship.name}</Link></div><div>{starship.model} | {starship.manufacturer}</div></div>
                </div>
              );
            }
          })
        ) : (
            <p>&nbsp;</p>
          )}

        {loading && "Loading our fleet information..."}
      </div>
    </div>
  );
};

export default List;
