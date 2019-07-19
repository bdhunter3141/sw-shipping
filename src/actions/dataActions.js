
function fetchStarships() {
  return fetch('https://swapi.co/api/starships');
}

function getStarships(starships) {
  return { type: "FETCH_STARSHIPS", data: starships }
}

function getStarshipsError(error) {
  return { type: "FETCH_STARSHIPS_ERROR", error }
}

export const fetchStarshipsAction = () => {
  return function (dispatch) {
    return fetchStarships().then(
      starships => dispatch(getStarships(starships)),
      error => dispatch(getStarshipsError(error))
    );
  };
}