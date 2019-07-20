import uuid from "uuid/v1";

export const fetchStarshipsAction = () => {
  return (dispatch, getState) => {
    const state = getState();
    dispatch({type: 'LOADING'});
    fetch(state.starshipsNextPage)
    .then(response => {
      const starships = response.json().then(
        starships => {
          console.log(starships)
          let starshipsList = [];
          starships.results.forEach((starship) => {
            starship.id = uuid();
            starshipsList.push(starship);
          });
          return { starships: starshipsList, next: starships.next};
        }
      )
      return starships;
    })
    .then(({starships, next}) => {
      dispatch({ type: 'FETCH_STARSHIPS', starships });
      dispatch({ type: 'UPDATE_STARSHIP_PAGE', next });
      dispatch({type: 'FINISHED_LOADING'});
    })
    .catch(err => {
      dispatch({ type: 'FETCH_STARSHIPS_ERROR', err });
      dispatch({type: 'FINISHED_LOADING'});
    });
  };
};
