import {
  GET_SEARCH,
  GET_DETAIL,
  POST_BOOKS,
  POST_REVIEWS,
  RESET_CREATE,
  CHANGE_FILTERS,
  GET_GENRES,
  CHANGE_SEARCH,
  CHANGE_PAGE,
  GET_EDITORIALS,
  PUT_STATUS,
  PUT_BOOK,
  USER_EXIST,
  ADD_TO_CART,
  POST_CART,
  GET_CART,
  GET_USER_CART,
} from "./actions";

const initialState = {
  user: {},
  books: [],
  editorials: [],
  genres: [],
  book: [],
  detail: [],
  filtersApplied: {
    sort: "A-Z",
    genres: "none",
    editorial: "none",
  },
  searchApplied: {
    option: "",
    name: "",
  },
  create: [],
  createReview: [],
  page: 0,
  total: 0,
  cart: [],
  postCartResponse: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case USER_EXIST:
      return { ...state, user: action.payload };

    case GET_GENRES:
      return { ...state, genres: action.payload };

    case GET_EDITORIALS:
      return { ...state, editorials: action.payload };

    case CHANGE_FILTERS:
      return { ...state, filtersApplied: action.payload, page: 0 };

    case CHANGE_SEARCH:
      return { ...state, searchApplied: action.payload, page: 0 };

    case CHANGE_PAGE:
      return { ...state, page: action.payload };

    case GET_SEARCH:
      return {
        ...state,
        books: action.payload.messageError
          ? action.payload
          : action.payload.books,
        total: action.payload.messageError
          ? action.payload
          : action.payload.total,
      };

    case GET_DETAIL:
      return { ...state, detail: action.payload };

    case PUT_STATUS:
      let aux = state.books;

      aux.forEach((el, index) => {
        if (el.id === action.payload.id) {
          aux.splice(index, 1, action.payload);
        }
      });

      return { ...state, detail: action.payload, books: aux };

    case PUT_BOOK:
      return { ...state, create: action.payload };

    case POST_REVIEWS:
      return { ...state, createReview: action.payload };

    case POST_BOOKS:
      return { ...state, create: action.payload };

    case RESET_CREATE:
      return { ...state, create: action.payload };

    case GET_CART:
      return { ...state, cart: action.payload };

    case GET_USER_CART:
      // console.log(action.payload);
      // console.log(action.payload.Books);
      return { ...state, cart: action.payload };

    case POST_CART:
      if (Array.isArray(action.payload)) {
        return { ...state };
      } else {
        return { ...state, postCartResponse: action.payload };
      }

    default:
      return { ...state };
  }
}
