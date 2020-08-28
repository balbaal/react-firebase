import { SET_LOADING } from "../types";
import firebase from "configs/firebase";

export const actionSetLoading = (payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload,
  });
};

export const actionRegisterUser = (payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  return firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(function (res) {
      console.log(res, ">>> response");
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
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
    });
};

export const actionLoginUser = (payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  return firebase
    .auth()
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(function (res) {
      console.log(res, ">>> response");
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
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
    });
};
