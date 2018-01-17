import {combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { loadingBarReducer } from 'react-redux-loading-bar'
import {reducer as toastrReducer} from 'react-redux-toastr'

import userReducer from "./userReducer";

const reducers = combineReducers({
  user: userReducer,
  router: routerReducer,
  form: reduxFormReducer,
  toastr: toastrReducer,
  loadingBar: loadingBarReducer
});

export default reducers;