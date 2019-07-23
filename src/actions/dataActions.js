import uuid from "uuid/v1";

export const fetchStarshipsAction = () => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({ type: "LOADING" });
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
        dispatch({ type: "UPDATE_STARSHIP_PAGE", next });
        dispatch({ type: "FINISHED_LOADING" });
      })
      .catch(err => {
        dispatch({ type: "FETCH_STARSHIPS_ERROR", err });
        dispatch({ type: "FINISHED_LOADING" });
      });
  };
};

export const fetchStarshipAction = (id) => {
  return (dispatch, getState) => {
    dispatch({ type: "LOADING" });
    fetch(`https://swapi.co/api/starships/${id}/`)
      .then(async response => {
        const starship = await response.json();
        dispatch({ type: "FETCH_STARSHIP", starship });
        dispatch({ type: "FINISHED_LOADING" });
        return starship;
      })
      .catch(err => {
        dispatch({ type: "FETCH_STARSHIP_ERROR", err });
        dispatch({ type: "FINISHED_LOADING" });
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
