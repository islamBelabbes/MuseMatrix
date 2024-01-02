const actionType = {
  CONTENT: "CONTENT",
  AUTHOR: "AUTHOR",
  COLOR: "COLOR",
  BOOK: "BOOK",
};

export const INITIAL_STATE = {
  content: "",
  author: "",
  color: "#262D33",
  book: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case actionType.CONTENT:
      return { ...state, content: action.payload };
    case actionType.AUTHOR:
      return { ...state, author: action.payload };
    case actionType.COLOR:
      return { ...state, color: action.payload };
    case actionType.BOOK:
      return { ...state, book: action.payload };
  }
}
