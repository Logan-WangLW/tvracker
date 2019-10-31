import {
  TOGGLE_SHOW_SEARCH_FORM,
  FETCH_TVMAZE_API_REQUEST,
  FETCH_TVMAZE_API_SUCCESS,
  FETCH_TVMAZE_API_ERROR,
} from '../actions/show-search';

const initialState = {
  showSearchForm: true,
  searchResults: null,
  loading: false,
  error: null
}

export default (state=initialState, action) => {
  if(action.type === TOGGLE_SHOW_SEARCH_FORM) {
    return Object.assign({}, state, {
      showSearchForm: !state.showSearchForm,
    })
  } else if (action.type === FETCH_TVMAZE_API_REQUEST) {
    return Object.assign({},state, {
      loading: true
    })
  } else if (action.type === FETCH_TVMAZE_API_SUCCESS) {
    console.log(action);
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