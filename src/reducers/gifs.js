import { REQUEST_GIFS } from '../actions';

const initialState =  {
  data: [],
  term: ''
};

/**
 * @Reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function gifs(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case REQUEST_GIFS:
      return {
        ...state, data: action.payload.body.data, term: action.meta.term
      };
    default:
      return state;
  }
}