import { SET_LOADING, SET_LOGIN, SET_USER, GET_POST } from "../types";
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
        const userData = {
          email: res.user.email,
          uid: res.user.uid,
          refreshToken: res.user.refreshToken,
          emailVerified: res.user.emailVerified,
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        dispatch({ type: SET_LOADING, payload: false });
        dispatch({ type: SET_LOGIN, payload: true });
        dispatch({
          type: SET_USER,
          payload: userData,
        });

        resolve(userData);
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

export const actionGetPost = (payload) => (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  const notesGet = firebaseDB.ref(`notes/${payload.uid}`);
  notesGet.on("value", (snapshot) => {
    let resNotes = snapshot.val();
    let resNotesArray = Object.keys(resNotes).map((key, i) => {
      return {
        id: key,
        ...resNotes[key],
      };
    });

    dispatch({ type: GET_POST, payload: resNotesArray });
    dispatch({ type: SET_LOADING, payload: false });
  });
};

export const actionUpdatePost = (payload) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  const postGet = firebaseDB.ref(`notes/${payload.uid}/${payload.id}`);
  postGet
    .set({
      title: payload.title,
      description: payload.description,
      date: payload.date,
    })
    .then((res) => {
      console.log(res, ">>> update post");
      dispatch({ type: SET_LOADING, payload: false });
    })
    .catch((err) => {
      console.log(err, ">>> failed update");
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
    });
};
