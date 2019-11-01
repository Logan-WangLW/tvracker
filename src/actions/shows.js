import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_TRACKED_SHOWS_REQUEST = 'FETCH_TRACKED_SHOWS_REQUEST';
export const fetchTrackedShowsRequest = () => ({
  type: FETCH_TRACKED_SHOWS_REQUEST
});

export const FETCH_TRACKED_SHOWS_SUCCESS = 'FETCH_TRACKED_SHOWS_SUCCESS';
export const fetchTrackedShowsSuccess = (shows) => ({
  type: FETCH_TRACKED_SHOWS_SUCCESS,
  shows
});

export const FETCH_TRACKED_SHOWS_ERROR = 'FETCH_TRACKED_SHOWS_ERROR';
export const fetchTrackedShowsError = error => ({
  type: FETCH_TRACKED_SHOWS_ERROR,
  error
});

export const fetchTrackedShows = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchTrackedShowsRequest());
  return fetch(`${API_BASE_URL}/show`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(res => {
      dispatch(fetchTrackedShowsSuccess(res))
    })
    .catch(err => dispatch(fetchTrackedShowsError(err)));
};

//add a tracked show
export const ADD_TRACKED_SHOWS_REQUEST = 'ADD_TRACKED_SHOWS_REQUEST';
export const addTrackedShowsRequest = () => ({
  type: ADD_TRACKED_SHOWS_REQUEST
});

export const ADD_TRACKED_SHOWS_SUCCESS = 'ADD_TRACKED_SHOWS_SUCCESS';
export const addTrackedShowsSuccess = (shows) => ({
  type: ADD_TRACKED_SHOWS_SUCCESS,
  shows
});

export const ADD_TRACKED_SHOWS_ERROR = 'ADD_TRACKED_SHOWS_ERROR';
export const addTrackedShowsError = error => ({
  type: ADD_TRACKED_SHOWS_ERROR,
  error
});

export const addTrackedShowsToUser = (id) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(addTrackedShowsRequest());
  fetch(`${API_BASE_URL}/show/${id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      authorization: `Bearer ${authToken}`
    },
  })
    .then(result => result.json())
    .then(shows => {
      dispatch(addTrackedShowsSuccess(shows))
    });
}
//delete a favorite
export const deleteTrackedShowsToUser = (id) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/show/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${authToken}`
    },
  })
    .then(result => result.json())
    .then(shows => {
      dispatch(fetchTrackedShowsSuccess(shows))
    })
}