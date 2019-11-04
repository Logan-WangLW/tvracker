import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_EPISODES_REQUEST = 'FETCH_EPISODES_REQUEST';
export const fetchEpisodesRequest = () => ({
  type: FETCH_EPISODES_REQUEST
});

export const FETCH_EPISODES_SUCCESS = 'FETCH_EPISODES_SUCCESS';
export const fetchEpisodesSuccess = (episodes) => ({
  type: FETCH_EPISODES_SUCCESS,
  episodes
});

export const FETCH_EPISODES_ERROR = 'FETCH_EPISODES_ERROR';
export const fetchEpisodesError = error => ({
  type: FETCH_EPISODES_ERROR,
  error
});

export const fetchEpisodes = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchEpisodesRequest());
  return fetch(`${API_BASE_URL}/episodes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(fetchEpisodesSuccess(res));
    })
    .catch(err => dispatch(fetchEpisodesError(err)));
};

//add episodes to shows
export const ADD_EPISODES_REQUEST = 'ADD_EPISODES_REQUEST';
export const addEpisodesRequest = () => ({
  type: ADD_EPISODES_REQUEST
});

export const ADD_EPISODES_SUCCESS = 'ADD_EPISODES_SUCCESS';
export const addEpisodesSuccess = (episodes) => ({
  type: ADD_EPISODES_SUCCESS,
  episodes
});

export const ADD_EPISODES_ERROR = 'ADD_EPISODES_ERROR';
export const addEpisodesError = error => ({
  type: ADD_EPISODES_ERROR,
  error
});

export const addEpisodes = (id) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(addEpisodesRequest());
  fetch(`${API_BASE_URL}/episodes/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${authToken}`
    },
  })
    .then(result => result.json())
    .then(episodes => {
      dispatch(addEpisodesSuccess(episodes));
    }).catch(err => dispatch(addEpisodesError(err)));
};
