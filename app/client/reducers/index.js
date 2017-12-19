import {combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { loadingBarReducer } from 'react-redux-loading-bar'

import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
  router: routerReducer,
  form: reduxFormReducer,
  loadingBar: loadingBarReducer
});

export default reducers;