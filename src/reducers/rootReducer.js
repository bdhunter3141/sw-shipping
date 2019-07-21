// Initial State
const initState = {
  loading: false,
  starships: [],
  starshipsNextPage: "https://swapi.co/api/starships/?page=1",
  characters: [],
  characterCount: null,
  characterIds: []
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
    case "UPDATE_STARSHIP_PAGE":
      console.log("Updated next Starships page.", action.next);
      return { ...state, starshipsNextPage: action.next };
    case "FETCH_CHARACTER_COUNT":
      console.log("Finished fetching character count.", action.count);
      return { ...state, characterCount: action.count };
    case "FETCH_CHARACTER_COUNT_ERROR":
      console.log("Fetching character count was unsuccessful.", action.count);
      return state;
    case "FETCH_CHARACTER":
      console.log("Finished fetching character.", action.character);
      return {
        ...state,
        characters: [...state.characters, action.character],
        characterIds: [
          ...state.characterIds,
          parseInt(action.character.url.split("/")[5])
        ]
      };
    case "FETCH_CHARACTER_ERROR":
      console.log("Fetching character was unsuccessful.", action.err);
      return state;
    default:
      return state;
  }
};

export default rootReducer;
