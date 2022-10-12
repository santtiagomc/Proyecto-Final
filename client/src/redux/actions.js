import axios from "axios";

export const GET_SEARCH = "GET_SEARCH";

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
