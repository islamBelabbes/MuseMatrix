const actionType = {
  GENRE: "GENRE",
  AUTHOR: "AUTHOR",
  TITLE: "TITLE",
  COVER: "COVER",
  CONTENT: "CONTENT",
  STATUS: "STATUS",
};

export const INITIAL_STATE = {
  genre: "",
  author: "",
  title: "",
  cover: "",
  content: "",
  status: "",
};

export function reducer(state, action) {
  switch (action.type) {
    case actionType.CONTENT:
      return { ...state, content: action.payload };
    case actionType.COVER:
      return { ...state, cover: action.payload };
    case actionType.GENRE:
      return { ...state, genre: action.payload };
    case actionType.AUTHOR:
      return { ...state, author: action.payload };
    case actionType.TITLE:
      return { ...state, title: action.payload };
    case actionType.STATUS:
      return { ...state, status: action.payload };
  }
}
