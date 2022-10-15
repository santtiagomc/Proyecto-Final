import {
  GET_SEARCH,
  GET_DETAIL,
  CLEAR_DETAIL,
  GET_REVIEWS,
  CHANGE_FILTERS,
  GET_FILTERED,
  GET_GENRES,
  GET_BOOKS,
} from "./actions";

const initialState = {
  books: [],
  booksCopy: [],
  genres: [],
  book: [],
  detail: [],
  reviews: [],
  filtersApplied: {
    sort: "A-Z",
    genres: "none",
    author: "none",
  },
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return { ...state, books: action.payload, booksCopy: action.payload };

    case GET_GENRES:
      return { ...state, genres: action.payload };

    case GET_FILTERED:
      return { ...state, books: action.payload };

    case CHANGE_FILTERS:
      return { ...state, filtersApplied: action.payload };

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
