import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import { ConnectedRouter } from 'react-router-redux'
import { IntlProvider } from 'react-intl'
import ReduxToastr from 'react-redux-toastr'
import "./img/profile/default.png"

// loaded bootstrap
import "bootstrap";
// load css
import "./css/css.references.js"

import store from "./store"
import Layout from "./components/Layout"
import history from './history'

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale="en">
      <ConnectedRouter history={history}>
        <Layout/>
      </ConnectedRouter>
    </IntlProvider>
  </Provider>

  ,app);