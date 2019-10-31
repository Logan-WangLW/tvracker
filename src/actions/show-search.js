import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_TVMAZE_API_REQUEST = 'FETCH_TVMAZE_API_REQUEST';
export const fetchTVMazeApiRequest = () => ({
  type: FETCH_TVMAZE_API_REQUEST,
});

export const FETCH_TVMAZE_API_SUCCESS = 'FETCH_TVMAZE_API_SUCCESS';
export const fetchTVMazeApiSuccess = (shows) => ({
  type: FETCH_TVMAZE_API_SUCCESS,
  shows
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
  .then(res => res.json())
  .then(res => res.shows)
  .then(res =>
    dispatch(fetchTVMazeApiSuccess(res)))
  .catch(err => dispatch(fetchTVMazeApiError(err)));
};