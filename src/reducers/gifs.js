import { REQUEST_GIFS, FETCH_FAVORITED_GIFS } from '../actions';

const initialState =  {
  data: [],
  favorites: [],
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
    case FETCH_FAVORITED_GIFS:
      var arr =[];
      for( var i in action.payload ) {
        if (action.payload.hasOwnProperty(i)){
          arr.push(action.payload[i]);
        }
      }
      return {
        ...state, favorites: arr
      };

    default:
      return state;
  }
}