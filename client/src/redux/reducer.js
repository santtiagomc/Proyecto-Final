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
  POST_CART,
  GET_CART,
  GET_USER_CART,
  DELETE_REVIEW,
  GET_MORE_RATING,
  GET_MORE_VISITS,
  GET_OFFERS,
  PUT_USER_CART,
  DELETE_USER_CART,
  GET_ALL_USERS,
  PUT_USER,
  GET_ALL_CARTS,
  GET_ALL_BOOKS,
  TABLE_VIEW,
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
  postCartResponse: [],
  deleteReview: [],
  booksByRating: [],
  booksByVisits: [],
  booksByOffers: [],
  putUserCartResponse: {},
  putStatusBook: {},
  deleteUserCartResponse: {},
  allUsers: [],
  allBooks: [],
  allCarts: [],
  putUserResponse: [],
  tableViewGlobal: "",
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
      return { ...state, putStatusBook: action.payload };

    case PUT_BOOK:
      if (Array.isArray(action.payload)) {
        return { ...state };
      } else {
        return { ...state, create: action.payload };
      }

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

    case DELETE_REVIEW:
      return { ...state, deleteReview: action.payload };

    case GET_MORE_RATING:
      return {
        ...state,
        booksByRating: action.payload.messageError
          ? action.payload
          : action.payload.books,
      };

    case GET_MORE_VISITS:
      return {
        ...state,
        booksByVisits: action.payload.messageError
          ? action.payload
          : action.payload.books,
      };

    case GET_OFFERS:
      return {
        ...state,
        booksByOffers: action.payload.messageError
          ? action.payload
          : action.payload.books,
      };

    case PUT_USER_CART:
      return { ...state, putUserCartResponse: action.payload };

    case DELETE_USER_CART:
      return { ...state, deleteUserCartResponse: action.payload };

    case GET_ALL_USERS:
      return { ...state, allUsers: action.payload };

    case PUT_USER:
      return { ...state, putUserResponse: action.payload };

    case GET_ALL_CARTS:
      return { ...state, allCarts: action.payload };

    case GET_ALL_BOOKS:
      return { ...state, allBooks: action.payload };

    case TABLE_VIEW:
      return { ...state, tableViewGlobal: action.payload };

    default:
      return { ...state };
  }
}
