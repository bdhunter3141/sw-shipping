// Initial State
const initState = {
  loading: false,
  starships: [],
  starshipsNextPage: 'https://swapi.co/api/starships/?page=1',
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOADING":
      console.log("Loading...");
      return { ...state, loading: true };
    case "FINISHED_LOADING":
      console.log("Finished Loading.");
      return { ...state, loading: false };
    case "FETCH_STARSHIPS":
      console.log("Finished fetching Starships", action.starships);
      return { ...state, starships: [...state.starships, ...action.starships] };
    case "FETCH_STARSHIPS_ERROR":
      console.log("Fetching Starships was unsuccessful.", action.err);
      return state;
    case 'UPDATE_STARSHIP_PAGE':
      console.log("Updated next Starships page.", action.next);
      return { ...state, starshipsNextPage: action.next };
    default:
      return state;
  }
};

export default rootReducer;
