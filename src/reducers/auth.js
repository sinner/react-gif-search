import { AUTH_USER, SIGN_OUT_USER, AUTH_ERROR, REMOVE_ERROR_MESSAGE } from '../actions';

const initialState =  {
  authenticated: false,
  error: null,
  user: null
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null,
        user: action.payload
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        error: null,
        user: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message,
        user: null
      };
    case REMOVE_ERROR_MESSAGE:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}