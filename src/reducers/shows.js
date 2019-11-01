import {
  FETCH_TRACKED_SHOWS_REQUEST,
  FETCH_TRACKED_SHOWS_SUCCESS,
  FETCH_TRACKED_SHOWS_ERROR,
  ADD_TRACKED_SHOWS_REQUEST,
  ADD_TRACKED_SHOWS_SUCCESS,
  ADD_TRACKED_SHOWS_ERROR
} from '../actions/shows.js';

//initial state
const initialState = {
  userShows: [],
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  if (action.type === FETCH_TRACKED_SHOWS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  } else if (action.type === FETCH_TRACKED_SHOWS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      userShows: action.shows
    })
  } else if (action.type === FETCH_TRACKED_SHOWS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  } else if (action.type === ADD_TRACKED_SHOWS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  } else if (action.type === ADD_TRACKED_SHOWS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      userShows: [action.shows, ...state.userShows]
    })
  } else if (action.type === ADD_TRACKED_SHOWS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  return state;
}