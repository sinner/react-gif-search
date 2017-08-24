import { REQUEST_GIFS } from '../actions';

const initialState =  {
  data: [],
  term: '',
  error: false,
  message: ''
};

/**
 * @Reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
export default function gifs(state = initialState, action) {
  switch (action.type) {
    case REQUEST_GIFS:
      return {
        ...state,
        data: (action.payload.body)?action.payload.body.data:[],
        term: action.meta.term,
        error: !(action.payload.body),
        message: !(action.payload.body)?action.payload.message:`There are the results of "${action.meta.term}" (${action.payload.body.data.length})`
      };
    default:
      return state;
  }
}