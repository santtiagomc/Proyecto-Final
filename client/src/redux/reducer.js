import { GET_SEARCH } from "./actions";

const initialState = {
  books: [],
  genres: [],
  book: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH:
      return { ...state, books: action.payload };

    default:
      return { ...state };
  }
}
