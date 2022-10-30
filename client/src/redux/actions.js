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
export const GET_CART = "GET_CART";
export const GET_USER_CART = "GET_USER_CART";
export const DELETE_REVIEW = "DELETE_REVIEW";
export const GET_MORE_VISITS = "GET_MORE_VISITS";
export const GET_MORE_RATING = "GET_MORE_RATING";
export const GET_OFFERS = "GET_OFFERS";
export const PUT_USER_CART = "PUT_USER_CART";
export const DELETE_USER_CART = "DELETE_USER_CART";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const PUT_USER = "PUT_USER";
export const GET_ALL_CARTS = "GET_ALL_CARTS";
export const GET_ALL_BOOKS = "GET_ALL_BOOKS";
export const TABLE_VIEW = "TABLE_VIEW";
export const USERS_ORDER_ADMIN = "USERS_ORDER_ADMIN";
export const BOOKS_ORDER_ADMIN = "BOOKS_ORDER_ADMIN";
export const CARTS_ORDER_ADMIN = "CARTS_ORDER_ADMIN";

export function userExist(payload) {
  return {
    type: USER_EXIST,
    payload,
  };
}

//-------para obtener los libros con filtros y páginado.
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

//-------para obtener las editoriales
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

//-------para obtener las categorías
export function getGenres(rank) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`http://localhost:3001/genres?rank=${rank}`);
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

//-------para obtener el detalle de un libro
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

//-------para agregar un nuevo libro
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

//-------para crear reviews
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

//-------para eliminar reviews
export function deleteReviews(input) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        `http://localhost:3001/reviews?UserId=${input.UserId}&BookId=${input.BookId}`
      );
      return dispatch({
        type: DELETE_REVIEW,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: DELETE_REVIEW,
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

//-------para modificar uel status de un libro
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

//-------para modificar un libro
export function putBook(id, body) {
  return async function (dispatch) {
    try {
      const json = await axios.put(
        `http://localhost:3001/book/details/${id}`,
        body
      );
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

//-------para crear carrito de usuario
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

//-------para obtener carrito de invitado
export function getGuestCart(localStorage) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/cart?localS=${localStorage}`
      );
      return dispatch({
        type: GET_CART,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_CART,
        payload: error.response.data,
      });
    }
  };
}

//-------para obtener carrito de usuario
export function getUserCart(userId) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/cart/${userId}`);
      return dispatch({
        type: GET_USER_CART,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_USER_CART,
        payload: error.response.data,
      });
    }
  };
}

//-------para obtener libros más puntuados (Landing Page)
export function getMoreRating() {
  return async function (dispatch) {
    try {
      const json = await axios(
        `http://localhost:3001/books?sort=rating&genres=none&editorial=none&page=0`
      );
      return dispatch({
        type: GET_MORE_RATING,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_MORE_RATING,
        payload: err.response.data,
      });
    }
  };
}

//-------para obtener libros más visitados (Landing Page)
export function getMoreVisits() {
  return async function (dispatch) {
    try {
      const json = await axios(
        `http://localhost:3001/books?sort=visits&genres=none&editorial=none&page=0`
      );
      return dispatch({
        type: GET_MORE_VISITS,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_MORE_VISITS,
        payload: err.response.data,
      });
    }
  };
}

//-------para obtener libros más baratos (Landing Page)
export function getOffers() {
  return async function (dispatch) {
    try {
      const json = await axios(
        `http://localhost:3001/books?sort=price-min-max&genres=none&editorial=none&page=0`
      );
      return dispatch({
        type: GET_OFFERS,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_OFFERS,
        payload: err.response.data,
      });
    }
  };
}

//-------para borrar un libro del carrito del usuario
export function putUserCart(cartId, bookId) {
  return async function (dispatch) {
    try {
      const response = await axios.put(
        `http://localhost:3001/cart?cartId=${cartId}&bookId=${bookId}`
      );

      return dispatch({
        type: PUT_USER_CART,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: PUT_USER_CART,
        payload: error.response.data,
      });
    }
  };
}

//------para borrar el carrito de un usuario
export function deleteUserCart(cartId) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        `http://localhost:3001/cart?cartId=${cartId}`
      );

      return dispatch({
        type: DELETE_USER_CART,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: DELETE_USER_CART,
        payload: error.response.data,
      });
    }
  };
}
//------para traer todos los usuarios (para dashboard)
export function getAllUsers(sort) {
  return async function (dispatch) {
    try {
      const json = await axios(`http://localhost:3001/user?sort=${sort}`);
      return dispatch({
        type: GET_ALL_USERS,
        payload: json.data,
      });
    } catch (err) {
      return dispatch({
        type: GET_ALL_USERS,
        payload: err.response.data,
      });
    }
  };
}

//-------para modificar estado o rol de usuarios
export function putUser(input) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`http://localhost:3001/user`, input);

      return dispatch({
        type: PUT_USER,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: PUT_USER,
        payload: error.response.data,
      });
    }
  };
}

//-------para traer todos los carritos con el estado que le pasemos
export function getCarts(status) {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `http://localhost:3001/cart/orders?status=${status}`
      );
      return dispatch({
        type: GET_ALL_CARTS,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_ALL_CARTS,
        payload: error.response.data,
      });
    }
  };
}

//------para traer todos los libros (para dashboard)
export function getAllBooks() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/books/admin`);
      return dispatch({
        type: GET_ALL_BOOKS,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: GET_ALL_BOOKS,
        payload: error.response.data,
      });
    }
  };
}
