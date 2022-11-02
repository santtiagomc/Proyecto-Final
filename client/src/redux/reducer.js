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
  USERS_ORDER_ADMIN,
  BOOKS_ORDER_ADMIN,
  CARTS_ORDER_ADMIN,
  POST_GENRE,
  DELETE_GENRE,
  PUT_CART_STATUS,
  GET_USER_DB,
  USERS_SEARCH_ADMIN,
  BOOKS_SEARCH_ADMIN,
  CARTS_SEARCH_ADMIN,
  GENRES_ORDER_ADMIN,
  EDIT_ID
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
  usersFiltersAdmin: {
    sort: "name-A-Z",
    searchValue: ""
  },
  allBooks: [],
  booksFiltersAdmin: {
    sort: "name-A-Z",
    searchValue: ""
  },
  allCarts: [],
  cartsFiltersAdmin: {
    sort: "status-Z-A",
    searchValue: ""
  },
  genresFiltersAdmin: "name-A-Z",
  putUserResponse: [],
  putCartResponse: [],
  tableViewGlobal: "addBook",
  messageGlobal: [],
  messageDeleteGlobal: [],
  userDb: {},
  edit_id: ""
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
      if (state.user && state.user.uid) {
        return { ...state }
      } else {
        return { ...state, cart: action.payload };
      }

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

    //------------ LUPA + ORDENAMIENTO TABLAS DE ADMIN -----------

    case USERS_ORDER_ADMIN:
      return { ...state, usersFiltersAdmin: { ...state.usersFiltersAdmin, sort: action.payload } };

    case USERS_SEARCH_ADMIN:
      return { ...state, usersFiltersAdmin: { ...state.usersFiltersAdmin, searchValue: action.payload } };

    case BOOKS_ORDER_ADMIN:
      return { ...state, booksFiltersAdmin: { ...state.booksFiltersAdmin, sort: action.payload } };

    case BOOKS_SEARCH_ADMIN:
      return { ...state, booksFiltersAdmin: { ...state.booksFiltersAdmin, searchValue: action.payload } };

    case CARTS_ORDER_ADMIN:
      return { ...state, cartsFiltersAdmin: { ...state.cartsFiltersAdmin, sort: action.payload } };

    case CARTS_SEARCH_ADMIN:
      return { ...state, cartsFiltersAdmin: { ...state.cartsFiltersAdmin, searchValue: action.payload } };

    case GENRES_ORDER_ADMIN:
      return { ...state, genresFiltersAdmin: action.payload };

    //------------ END LUPA + ORDENAMIENTO TABLAS DE ADMIN -----------
    case POST_GENRE:
      return { ...state, messageGlobal: action.payload };

    case DELETE_GENRE:
      return { ...state, messageDeleteGlobal: action.payload };

    case PUT_CART_STATUS:
      return { ...state, putCartResponse: action.payload };

    case GET_USER_DB:
      // console.log(action.payload);
      return { ...state, userDb: action.payload };

    case EDIT_ID:
      return { ...state, edit_id: action.payload }

    default:
      return { ...state };
  }
}
