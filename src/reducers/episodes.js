import {
  FETCH_EPISODES_REQUEST,
  FETCH_EPISODES_SUCCESS,
  FETCH_EPISODES_ERROR,
  ADD_EPISODES_REQUEST,
  ADD_EPISODES_SUCCESS,
  ADD_EPISODES_ERROR
} from '../actions/episodes';

//initial state
const initialState = {
  showEpisodes: [],
  loading: false,
  error: null
}

export default (state = initialState, action) => {
  if (action.type === FETCH_EPISODES_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  } else if (action.type === FETCH_EPISODES_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      showEpisodes: action.episodes
    })
  } else if (action.type === FETCH_EPISODES_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  } else if (action.type === ADD_EPISODES_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  } else if (action.type === ADD_EPISODES_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      showEpisodes: [action.episodes, ...state.episodes]
    })
  } else if (action.type === ADD_EPISODES_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  return state;
}