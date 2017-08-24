import request from 'superagent';
import config from '../config/main';

export const REQUEST_GIFS = 'REQUEST_GIFS';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const API_URL = config.dev.giphyAPIUrl;
const API_KEY = config.dev.giphyAPIKey;
const API_RESULTS_LIMIT = config.dev.giphyResultsLimit;

/**
 * It's an Action Creator to search Gifs based on a criteria (term)
 *
 * @param term
 * @returns {{type: string, term: *}}
 */
export function requestGifs(term = null) {

  let url = `${API_URL}?api_key=${API_KEY}&q=${term.replace(/\s/g, '+')}&limit=${API_RESULTS_LIMIT}`;
  const data = request.get(url);

  // If our action is going to have a Promise should respect the standard flux action definition,
  // therefore, we have to keep in mind that a standard flux action should have only this properties ['type', 'payload', 'error', 'meta']

  return { // It's the action
    type: REQUEST_GIFS,
    payload: data,
    meta: {
      term: term
    }
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
