import axios from "axios";

export const GET_BOOKS = "GET_BOOKS";
export const GET_GENRES = "GET_GENRES";
export const GET_SEARCH = "GET_SEARCH";
export const GET_DETAIL = "GET_DETAIL";
export const GET_REVIEWS = "GET_REVIEWS";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_FILTERED = "GET_FILTERED";
export const CHANGE_FILTERS = "CHANGE_FILTERS";

export function getBooks() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/books`);
      return dispatch({
        type: GET_BOOKS,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_BOOKS,
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

export function getFilteredBooks({ sort, genres, author }) {
  return async function (dispatch) {
    try {
      const json = await axios.get(
        `http://localhost:3001/books/filters?sort=${sort}&genres=${genres}&author=${author}`);
      console.log(json.data)
      return dispatch({
        type: GET_FILTERED,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_FILTERED,
        payload: err.response.data,
      });
    }
  };
}

export function changeFilter(filters) {
  return { type: CHANGE_FILTERS, payload: filters };
}
export const POST_BOOKS = "POST_BOOKS";
export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const GET_GENRE = "GET_GENRE"
export const RESET_CREATE = "RESET_CREATE"

export function searchBook(option, name) {
  return async function (dispatch) {
    try {
      let json
      if (option) {
        json = await axios(`http://localhost:3001/books?${option}=${name}`);
      } else {
        json = await axios("http://localhost:3001/books");
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

export function getReview() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/reviews`);
      return dispatch({
        type: GET_REVIEWS,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_REVIEWS,
        payload: err.response.data,
      });
    }
  };
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL,
  };
}

export function addBooks(input) {
  return async function (dispatch) {
    try {
      const response = await axios.post('http://localhost:3001/books', input);

      return dispatch({
        type: POST_BOOKS,
        payload: response.data
      })
    }
    catch (error) {
      return dispatch({
        type: POST_BOOKS,
        payload: error.response.data
      })
    }
  }
}

export function getAllBooks() {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/books")
      return dispatch({
        type: GET_ALL_BOOKS,
        payload: json.data
      })
    } catch (error) {
      alert("Don't have any connections 😫")
    }
  }
}

export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: GET_GENRE,
      payload: json.data
    })
  }
};

export function resetCreate() {
  return {
    type: RESET_CREATE,
    payload: []
  }
}