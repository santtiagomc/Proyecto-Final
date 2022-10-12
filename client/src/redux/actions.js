import axios from "axios";

export const GET_SEARCH = "GET_SEARCH";
export const SEARCH_COUNTRY = "SEARCH_COUNTRY";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";

export const searchCountry = (payload) => {
  return async (dispatch) => {
    axios
      .get(`http://localhost:3001/acavaunaruta?name=${payload}`)
      .then((response) => response.data)
      .then((response) => dispatch({ type: SEARCH_COUNTRY, payload: response }))
      .catch((err) =>
        dispatch({ type: SEARCH_COUNTRY, payload: ["404 not found"] })
      );
  };
};

export function getDetail(id){
  return async function (dispatch) {
      try {
          var json = await axios.get(`http://localhost:3001/acavaunaruta/${id}`)
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
