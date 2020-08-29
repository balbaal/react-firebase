import { SET_LOADING, SET_LOGIN, SET_USER, GET_POST } from "../types";

const initialState = {
  isLoading: false,
  isLogin: false,
  user: {},
  posts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case GET_POST:
      return {
        ...state,
        posts: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
