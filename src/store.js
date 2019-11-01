import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducers/auth';
import showSearchReducer from './reducers/show-search';
import showsReducer from './reducers/shows';

import thunk from 'redux-thunk';
import { setAuthToken, refreshAuthToken } from './actions/auth.js';
import { loadAuthToken } from './local-storage';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    show: showSearchReducer,
    shows: showsReducer
  }),
  composeWithDevTools(applyMiddleware(thunk))
);

//Hydrate authToken
const authToken = loadAuthToken();

if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;