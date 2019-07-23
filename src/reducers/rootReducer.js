// Initial State
const initState = {
  loading: true,
  starships: [],
  starshipsNextPage: "https://swapi.co/api/starships/?page=1",
  characters: [],
  characterCount: null,
  lastCharacterId: 0,
  currentStarship: {}
};

// Reducer
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_STARSHIPS":
      // Add Starships to array of starships in store
      return { ...state, starships: [...state.starships, ...action.starships] };
    case "FETCH_STARSHIPS_ERROR":
      // If fetching Starships fails, return state
      return state;
    case "FETCH_STARSHIP":
      // Update current Starship to new fetched Starship in store
      return { ...state, currentStarship: action.starship };
    case "FETCH_STARSHIP_ERROR":
      // If fetching Starship fails, return state
      return state;
    case "LOADING":
      // Set loading true in store
      return { ...state, loading: true };
    case "FINISHED_LOADING":
      // Set loading false in store
      return { ...state, loading: false };
    case "UPDATE_STARSHIP_PAGE":
      // Update the next available page of Starships in store
      return { ...state, starshipsNextPage: action.next };
    case "FETCH_CHARACTER":
      // Add fetched character to array of characters in store and update what the last character id was
      return {
        ...state,
        characters: [...state.characters, action.character],
        lastCharacterId: action.characterId
      };
    case "FETCH_CHARACTER_ERROR":
      // If fetching character fails, return state
      console.log("Fetching character was unsuccessful.", action.err);
      return state;
    default:
      return state;
  }
};

export default rootReducer;
