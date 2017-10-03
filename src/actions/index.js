import request from 'superagent';
import config from '../config/main';
import Firebase from 'firebase';

// ACTION TYPES
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const REQUEST_GIFS = 'REQUEST_GIFS';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const REMOVE_ERROR_MESSAGE = 'REMOVE_ERROR_MESSAGE';
export const FETCH_FAVORITED_GIFS = 'FETCH_FAVORITED_GIFS';

const API_URL = config.dev.giphy.APIUrl;
const API_KEY = config.dev.giphy.APIKey;
const API_RESULTS_LIMIT = config.dev.giphy.resultsLimit;
const firebaseConfig = config.dev.firebase;

Firebase.initializeApp(firebaseConfig);

/**
 * It's an Action Creator to search Gifs based on a criteria (term)
 *
 * @param term
 * @returns {Function}
 */
export function requestGifs(term = null) {

  let url = `${API_URL}?api_key=${API_KEY}&q=${term.replace(/\s/g, '+')}&limit=${API_RESULTS_LIMIT}`;

  // If our action is going to have a Promise should respect the standard flux action definition,
  // therefore, we have to keep in mind that a standard flux action should have only this properties ['type', 'payload', 'error', 'meta']

  return function(dispatch) {
    request.get(url).then(response => {
      dispatch({ // It's the action
        type: REQUEST_GIFS,
        payload: response,
        meta: {
          term: term
        }
      });
    });
  };

}

/**
 * It's an Action Creator to Open Modal
 *
 * @param gif
 * @returns {{type: string, gif: *}}
 */
export function openModal(gif) {
  return { // It's the action
    type: OPEN_MODAL,
    gif
  }
}

/**
 * It's an Action Creator to close Modal
 *
 * @returns {{type: string}}
 */
export function closeModal() {
  return { // It's the action
    type: CLOSE_MODAL
  }
}

export function signUpUser(credentials) {
  return function(dispatch) {
    Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser(Firebase.auth().currentUser));
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  }
}

export function signInUser(credentials) {
  return function(dispatch) {
    Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(response => {
        dispatch(authUser(Firebase.auth().currentUser));
      })
      .catch(error => {
        console.log(error);
        dispatch(authError(error));
      });
  }
}

export function authUser(user) {
  return {
    type: AUTH_USER,
    payload: user
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signOutUser() {
  return function (dispatch) {
    Firebase.auth().signOut()
      .then(() =>{
        dispatch({
          type: SIGN_OUT_USER
        })
      });
  }
}

export function verifyAuth() {
  return function (dispatch) {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(authUser(Firebase.auth().currentUser));
      }
      else {
        dispatch(signOutUser());
      }
    });
  }
}


export function removeErrorMessage() {
  return {
    type: REMOVE_ERROR_MESSAGE
  }
}

export function favoriteGif({selectedGif}) {
  const userUid = Firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;

  return dispatch => Firebase.database().ref(userUid).update({
    [gifId]: selectedGif
  });
}

export function unfavoriteGif({selectedGif}) {
  const userUid = Firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;

  return dispatch => Firebase.database().ref(userUid).child(gifId).remove();
}

export function fetchFavoritedGifs() {
  return function(dispatch) {
    const userUid = Firebase.auth().currentUser.uid;

    Firebase.database().ref(userUid).on('value', snapshot => {
      dispatch({
        type: FETCH_FAVORITED_GIFS,
        payload: snapshot.val()
      })
    });
  }
}