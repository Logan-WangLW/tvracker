import {
  FETCH_TVMAZE_API_REQUEST,
  FETCH_TVMAZE_API_SUCCESS,
  FETCH_TVMAZE_API_ERROR,
} from '../actions/show-search';

const initialState = {
  searchResults: null,
  loading: false,
  error: null
}

export default (state=initialState, action) => {
 if (action.type === FETCH_TVMAZE_API_REQUEST) {
    return Object.assign({},state, {
      loading: true
    })
  } else if (action.type === FETCH_TVMAZE_API_SUCCESS) {
    return Object.assign({},state,{
      searchResults: action.shows,
      loading: false,
    })
  } else if (action.type === FETCH_TVMAZE_API_ERROR) {
    return Object.assign({},state,{
      error: action.error,
      loading: false,
    })
  }
  return state;
}