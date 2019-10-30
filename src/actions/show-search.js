import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const TOGGLE_SHOW_SEARCH_FORM = 'TOGGLE_SHOW_SEARCH_FORM';
export const toggleShowSearchForm = () => ({
  type: TOGGLE_SHOW_SEARCH_FORM,
});

export const FETCH_TVMAZE_API_REQUEST = 'FETCH_TVMAZE_API_REQUEST';
export const fetchTVMazeApiRequest = () => ({
  type: FETCH_TVMAZE_API_REQUEST,
});

export const FETCH_TVMAZE_API_SUCCESS = 'FETCH_TVMAZE_API_SUCCESS';
export const fetchTVMazeApiSuccess = (searchQuery) => ({
  type: FETCH_TVMAZE_API_SUCCESS,
  searchQuery,
});

export const FETCH_TVMAZE_API_ERROR = 'FETCH_TVMAZE_API_ERROR';
export const fetchTVMazeApiError = (error) => ({
  type: FETCH_TVMAZE_API_ERROR,
  error,
});

export const fetchTVMazeApi = userSearchQuery => (dispatch, getState) => {
  dispatch(fetchTVMazeApiRequest());
  const {search} = userSearchQuery;
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/show-search`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
        search
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => console.log(res.body))
  .then(res => res.json())
  .then(res => dispatch(fetchTVMazeApiSuccess(res)))
  .catch(err => dispatch(fetchTVMazeApiError(err)));
}

export const FETCH_SHOWS_REQUEST = 'FETCH_SHOW_REQUEST';
export const fetchShowsRequest = () => ({
  type: FETCH_SHOWS_REQUEST,
});

export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOW_SUCCESS';
export const fetchShowsSuccess = (results) => ({
  type: FETCH_SHOWS_SUCCESS,
  results,
});

export const FETCH_SHOWS_ERROR = 'FETCH_SHOW_ERROR';
export const fetchShowsError = (error) => ({
  type: FETCH_SHOWS_ERROR,
  error,
});

export const fetchShows = shows => (dispatch, getState) => {
  dispatch(fetchShowsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/show-search-complete`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      shows,
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => dispatch(fetchShowsSuccess(res)))
  .catch(err => dispatch(fetchShowsError(err)))
}