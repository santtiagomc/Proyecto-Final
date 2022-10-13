import axios from "axios";

export const GET_SEARCH = "GET_SEARCH";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";

export const searchBook = (payload) => {
  return async (dispatch) => {
    axios
      .get(`http://localhost:3001/books?name=${payload}`)
      .then((response) => response.data)
      .then((response) => dispatch({ type: GET_SEARCH, payload: response }))
      .catch((err) =>
        dispatch({ type: GET_SEARCH, payload: ["404 not found"] })
      );
  };
};

export function getDetail(id){
  return async function (dispatch) {
      try {
          var json = await axios.get(`http://localhost:3001/book/${id}`)
          return dispatch({
              type: 'GET_DETAIL',
              payload: json.data
          })
      } catch (err) {
          console.log(err)
      }
  }
}

export function clearDetail(){
  return {
      type: 'CLEAR_DETAIL',
  }
}
