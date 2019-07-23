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
        dispatch({ type: "UPDATE_STARSHIP_PAGE", next });
      })
      .catch(err => {
        dispatch({ type: "FETCH_STARSHIPS_ERROR", err });
      });
  };
};

export const fetchCharacterCountAction = () => {
  return (dispatch, getState) => {
    fetch("https://swapi.co/api/people/")
      .then(response => {
        const characterCount = response.json().then(characters => {
          return characters.count;
        });
        return characterCount;
      })
      .then(count => {
        dispatch({ type: "FETCH_CHARACTER_COUNT", count });
      })
      .catch(err => {
        dispatch({ type: "FETCH_CHARACTER_COUNT_ERROR", err });
      });
  };
};

export const fetchCharacterAction = () => {
  return (dispatch, getState) => {
    const state = getState();
    const characterCount = state.characterCount;
    const characterIds = state.characterIds;

    function getRandomId() {
      let randomCharacterId = Math.floor(Math.random() * characterCount) + 1;
      console.log(characterIds)
      if (characterIds.includes(randomCharacterId)) {
        getRandomId();
        return
      } else {
        return randomCharacterId;
      }
    }
    const characterId = getRandomId();

    fetch(`https://swapi.co/api/people/${characterId}/`)
      .then(response => {
        const characterData = response.json().then(character => {
          return character;
        });
        return characterData;
      })
      .then(character => {
        dispatch({ type: "FETCH_CHARACTER", character });
      })
      .catch(err => {
        dispatch({ type: "FETCH_CHARACTER_ERROR", err });
      });
  };
};
