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
    case "FETCH_STARSHIPS":
      return { ...state, starships: [...state.starships, ...action.starships] };
    case "FETCH_STARSHIPS_ERROR":
      return state;
    case "UPDATE_STARSHIP_PAGE":
      return { ...state, starshipsNextPage: action.next };
    case "FETCH_CHARACTER_COUNT":
      return { ...state, characterCount: action.count };
    case "FETCH_CHARACTER_COUNT_ERROR":
      return state;
    case "FETCH_CHARACTER":
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
