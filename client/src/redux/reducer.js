import { GET_SEARCH, GET_DETAIL, CLEAR_DETAIL, GET_REVIEWS } from "./actions";

const initialState = {
  books: [],
  genres: [],
  book: [],
  detail: [],
  reviews: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH:
      return { ...state, books: action.payload };

    case GET_DETAIL:
      return { ...state, detail: action.payload };

    case GET_REVIEWS:
      return { ...state, reviews: action.payload };

    case CLEAR_DETAIL:
      return { ...state, detail: [] };

    default:
      return { ...state };
  }
}
