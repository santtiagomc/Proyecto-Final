const initialState = {
  books: [],
  genres: [],
  book: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return { ...state };
  }
}
