// Initial State
const initState = {
  loading: true,
  starships: [],
  starshipsNextPage: "https://swapi.co/api/starships/?page=1",
  characters: [],
  characterCount: null,
  lastCharacterId: 0,
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_STARSHIPS":
      return { ...state, starships: [...state.starships, ...action.starships] };
    case "FETCH_STARSHIPS_ERROR":
      return state;
    case "LOADING":
      return {...state, loading: true};
    case "FINISHED_LOADING":
      return {...state, loading: false};
    case "UPDATE_STARSHIP_PAGE":
      return { ...state, starshipsNextPage: action.next };
    case "FETCH_CHARACTER":
      return {
        ...state,
        characters: [...state.characters, action.character],
        lastCharacterId: action.characterId
      };
    case "FETCH_CHARACTER_ERROR":
      console.log("Fetching character was unsuccessful.", action.err);
      return state;
    default:
      return state;
  }
};

export default rootReducer;
