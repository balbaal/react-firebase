import { SET_LOADING, SET_LOGIN, SET_USER } from "../types";

const initialState = {
  isLoading: false,
  isLogin: false,
  user: {},
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

    default:
      return state;
  }
};

export default reducer;
