import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchStarshipsAction,
  fetchCharacterCountAction,
  fetchCharacterAction
} from "../actions/dataActions";

const List = () => {
  const starships = useSelector(state => state.starships);
  const starshipsNextPage = useSelector(state => state.starshipsNextPage);
  const characterCount = useSelector(state => state.characterCount);
  const characters = useSelector(state => state.characters);
  const dispatch = useDispatch();
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!characterCount) {
      dispatch(fetchCharacterCountAction());
    }
    if (characters.length / starships.length <= 0.2) {
      dispatch(fetchCharacterAction());
    }
  });

  useEffect(() => {
    dispatch(fetchStarshipsAction());
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleScroll() {
    if (
      document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.scrollHeight &&
      starshipsNextPage
    ) {
      setLoadMore(true);
      dispatch(fetchStarshipsAction());
      setLoadMore(false);
    }
  }

  return (
    <div id="list-container">
      <h2>Our Fleet</h2>
      {starships.length ? (
        starships.map((starship, i) => {
          if (i % 8 === 0 && i !== 0) {
            let characterInfo = characters[i / 8 - 1] || "";
            return (
              <div key={starship.id}>
                <div className="character-list-item">{characterInfo.name}</div>
                <div className="starship-list-item">{starship.name}</div>
              </div>
            );
          } else {
            return (
              <div key={starship.id} className="starship-list-item">
                {starship.name}
              </div>
            );
          }
        })
      ) : (
        <p>&nbsp;</p>
      )}

      {loadMore && "Fetching more list items..."}

      {/* {loading ? (
        <p>Loading...</p>
      ) : starshipsNextPage ? (
        <button
          onClick={() => {

          }}
        >
          Fetch
        </button>
      ) : (
        <p>No More Starships</p>
      )} */}
    </div>
  );
};

export default List;
