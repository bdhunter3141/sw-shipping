// Initial State
const initState = {
  loading: true,
  starships: [],
}

const rootReducer = (state = initState, action) => {
  console.log(action);
  return state;
};

export default rootReducer;