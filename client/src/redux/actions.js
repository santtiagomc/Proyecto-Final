import axios from "axios";

export const GET_GENRES = "GET_GENRES";
export const GET_SEARCH = "GET_SEARCH";
export const GET_DETAIL = "GET_DETAIL";
export const GET_EDITORIALS = "GET_EDITORIALS";
export const CHANGE_FILTERS = "CHANGE_FILTERS";
export const CHANGE_SEARCH = "CHANGE_SEARCH";
export const POST_BOOKS = "POST_BOOKS";
export const POST_REVIEWS = "POST_REVIEWS";
export const RESET_CREATE = "RESET_CREATE";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const PUT_STATUS = "PUT_STATUS";
export const PUT_BOOK = "PUT_BOOK";
export const USER_EXIST = "USER_EXIST";
export const POST_CART = "POST_CART";

export function userExist(payload) {
  return {
    type: USER_EXIST,
    payload,
  };
}
export const ADD_TO_CART = "ADD_TO_CART";

export function searchBook(filters, search, page) {
  return async function (dispatch) {
    try {
      let json;
      if (search.option && search.name) {
        json = await axios(
          `http://localhost:3001/books?${search.option}=${search.name}&sort=${filters.sort}&genres=${filters.genres}&editorial=${filters.editorial}&page=${page}`
        );
      } else {
        json = await axios(
          `http://localhost:3001/books?sort=${filters.sort}&genres=${filters.genres}&editorial=${filters.editorial}&page=${page}`
        );
      }
      return dispatch({
        type: GET_SEARCH,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_SEARCH,
        payload: err.response.data,
      });
    }
  };
}

export function changeFilter(
  filters = { sort: "A-Z", genres: "none", editorial: "none" }
) {
  return { type: CHANGE_FILTERS, payload: filters };
}

export function changeSearch(search = { option: "all", name: "" }) {
  return { type: CHANGE_SEARCH, payload: search };
}

export function changePage(page = 0) {
  return { type: CHANGE_PAGE, payload: page };
}

export function getEditorials() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/editorials`);
      return dispatch({
        type: GET_EDITORIALS,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_EDITORIALS,
        payload: err.response.data,
      });
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/genres`);
      return dispatch({
        type: GET_GENRES,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_GENRES,
        payload: err.response.data,
      });
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/book/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_DETAIL,
        payload: err.response.data,
      });
    }
  };
}

export function addBooks(input) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/books", input);
      return dispatch({
        type: POST_BOOKS,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: POST_BOOKS,
        payload: error.response.data,
      });
    }
  };
}

export function postReviews(input) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/reviews", input);
      return dispatch({
        type: POST_REVIEWS,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: POST_REVIEWS,
        payload: error.response.data,
      });
    }
  };
}

export function resetCreate() {
  return {
    type: RESET_CREATE,
    payload: [],
  };
}

export function putStatus(id) {
  return async function (dispatch) {
    try {
      const json = await axios.put(`http://localhost:3001/book/${id}`);
      return dispatch({
        type: PUT_STATUS,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: PUT_STATUS,
        payload: err.response.data,
      });
    }
  };
}

export function putBook(id, body) {
  console.log(body);
  return async function (dispatch) {
    try {
      const json = await axios.put(
        `http://localhost:3001/book/details/${id}`,
        body
      );
      console.log(json);
      return dispatch({
        type: PUT_BOOK,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: PUT_BOOK,
        payload: err.response.data,
      });
    }
  };
}

// export function addToCart(id) {
// 	return function (dispatch) {
// 			dispatch({
// 					type: ADD_TO_CART,
// 					payload: id
// 			})
// 	}
// }

export function addToCart(localStorage) {
  //proximamente modificar para mandar datos al back
  return {
    type: ADD_TO_CART,
    payload: localStorage,
  };
}

export function postCart(cart) {
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/cart", cart);
      return dispatch({
        type: POST_CART,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: POST_CART,
        payload: error.response.data,
      });
    }
  };
}
