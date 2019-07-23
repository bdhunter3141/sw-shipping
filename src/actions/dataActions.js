import uuid from "uuid/v1";

export const fetchStarshipsAction = () => {
  return (dispatch, getState) => {
    const state = getState();
    fetch(state.starshipsNextPage)
      .then(response => {
        const starships = response.json().then(starships => {
          let starshipsList = [];
          starships.results.forEach(starship => {
            starship.id = uuid();
            starshipsList.push(starship);
          });
          return { starships: starshipsList, next: starships.next };
        });
        return starships;
      })
      .then(({ starships, next }) => {
        dispatch({ type: "FETCH_STARSHIPS", starships });
        dispatch({ type: "LOADING" });
        dispatch({ type: "UPDATE_STARSHIP_PAGE", next });
        dispatch({ type: "FINISHED_LOADING" });
      })
      .catch(err => {
        dispatch({ type: "FETCH_STARSHIPS_ERROR", err });
      });
  };
};

export const fetchCharacterAction = (lastCharacterId) => {
  return (dispatch, getState) => {
    const characterId = lastCharacterId + 1;

    fetch(`https://swapi.co/api/people/${characterId}/`)
      .then(response => {
        const characterData = response.json().then(character => {
          return character;
        });
        return characterData;
      })
      .then(character => {
        dispatch({ type: "FETCH_CHARACTER", character, characterId });
      })
      .catch(err => {
        dispatch({ type: "FETCH_CHARACTER_ERROR", err });
      });
  };
};
