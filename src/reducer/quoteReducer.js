const actionType = {
  QUOTE: "QUOTE",
  AUTHOR: "AUTHOR",
  COLOR: "COLOR",
  POST: "POST",
};

export const INITIAL_STATE = {
  quote: "",
  author: "",
  color: "#262D33",
  post: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case actionType.QUOTE:
      return { ...state, quote: action.payload };
    case actionType.AUTHOR:
      return { ...state, author: action.payload };
    case actionType.COLOR:
      return { ...state, color: action.payload };
    case actionType.POST:
      return { ...state, post: action.payload };
  }
}
