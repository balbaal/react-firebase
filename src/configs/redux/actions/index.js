import { SET_LOADING, SET_LOGIN, SET_USER } from "../types";
import firebaseConfig, { firebaseDB } from "configs/firebase";

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

    firebaseConfig
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

    firebaseConfig
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(function (res) {
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          refreshToken: res.user.refreshToken,
          emailVerified: res.user.emailVerified,
        };

        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_LOGIN, payload: true });
        dispatch({
          type: SET_USER,
          payload: dataUser,
        });

        resolve(dataUser);
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

export const actionCreatePost = (payload) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  return firebaseDB
    .ref(`notes/${payload.uid}`)
    .push({
      title: payload.title,
      description: payload.description,
      date: payload.date,
    })
    .then((res) => {
      console.log(res, ">>> create post");
      dispatch({ type: SET_LOADING, payload: false });
    })
    .catch((err) => {
      console.log((err, ">>> failed post"));
      dispatch({ type: SET_LOADING, payload: false });
    });
};
