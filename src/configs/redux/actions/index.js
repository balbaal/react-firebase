import { SET_LOADING, SET_LOGIN, SET_USER } from "../types";
import firebase from "configs/firebase";

export const actionSetLoading = (payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload,
  });
};

export const actionRegisterUser = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });

    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(function (res) {
        console.log(res, ">>> response");
        dispatch({
          type: SET_LOADING,
          payload: false,
        });

        resolve(true);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error, ">>> error");
        dispatch({
          type: SET_LOADING,
          payload: false,
        });

        reject(false);
      });
  });
};

export const actionLoginUser = (payload) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: SET_LOADING,
      payload: true,
    });

    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(function (res) {
        console.log(res, ">>> response");
        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_LOGIN, payload: true });
        dispatch({
          type: SET_USER,
          payload: {
            user: res.user.email,
            id: res.user.uid,
          },
        });

        resolve(true);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error, ">>> error");
        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_LOGIN, payload: false });

        reject(false);
      });
  });
};
