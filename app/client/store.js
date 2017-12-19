import {applyMiddleware, createStore, combineReducers} from  "redux"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { loadingBarMiddleware } from 'react-redux-loading-bar'


import reducers from "./reducers/index"

const history = createHistory();
const historyMiddleware = routerMiddleware(history);
const middleware = applyMiddleware(promise(), thunk, historyMiddleware, loadingBarMiddleware());
const store = createStore(reducers, middleware);

export default store;

