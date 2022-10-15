import axios from "axios";

export const GET_SEARCH = "GET_SEARCH";
export const GET_DETAIL = "GET_DETAIL";
export const GET_REVIEWS = "GET_REVIEWS";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const POST_BOOKS = "POST_BOOKS";
export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const GET_GENRE = "GET_GENRE"

export function searchBook(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/books?name=${name}`);
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

export function addBooks (payload) {
  return async function(dispatch)  {
      try{
          await axios.post('http://localhost:3001/books', payload);
          return {
              type: POST_BOOKS,
              }
      } 
      catch(error){
            alert("Post failed")
      }
  } 
}

export function getAllBooks () {
  return async function (dispatch){
      try {
          var json = await axios.get("http://localhost:3001/books")
          return dispatch ({
              type: GET_ALL_BOOKS,
              payload: json.data
          })
      } catch (error) {
          alert("Don't have any connections 😫")
      }
  }
}

export function getGenres (){
  return async function (dispatch){
      var json = await axios.get("http://localhost:3001/genres");
      return dispatch ({
          type: GET_GENRE, 
          payload: json.data
      })
  }
};
