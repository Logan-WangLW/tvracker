import {
  TOGGLE_SHOW_SEARCH_FORM,
  FETCH_TVMAZE_API_REQUEST,
  FETCH_TVMAZE_API_SUCCESS,
  FETCH_TVMAZE_API_ERROR,
  FETCH_SHOWS_REQUEST,
  FETCH_SHOWS_SUCCESS,
  FETCH_SHOWS_ERROR,
} from '../actions/show-search';

const initialState = {
  showSearchForm: true,
  searchResults: null,
  loading: false,
  error: null,
  searchResultsShows: null
}

export default function reducer(state=initialState, action) {
  if(action.type === TOGGLE_SHOW_SEARCH_FORM) {
    return {
      ...state,
      showSearchForm: !state.showSearchForm,
    }
  } if (action.type === FETCH_TVMAZE_API_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } if (action.type === FETCH_TVMAZE_API_SUCCESS) {
    return {
      ...state, 
      searchResults: action.searchQuery,
      loading: false,
    }
  } if (action.type === FETCH_TVMAZE_API_ERROR) {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  } if (action.type === FETCH_SHOWS_REQUEST) {
    return {
      ...state, 
      loading: true,
    }
  } if (action.type === FETCH_SHOWS_SUCCESS) {
    return {
      ...state,
      searchResultsShows: action.results,
      loading: false,
    }
  } if (action.type === FETCH_SHOWS_ERROR) {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }
  return state;
}