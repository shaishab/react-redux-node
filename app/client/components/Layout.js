import React from "react";
import { Route, Switch } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'

import Home from "./Home"
import UserList from "./user/UserList"
import UserCreate from "./user/UserCreate"
import NotFound from "./NotFound"

class Layout extends React.Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
          <Link to="/" className="navbar-brand">NodeReact</Link>
          <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                  data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                  aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item">
                <NavLink exact to="/" className="nav-link">Home <span class="sr-only">(current)</span></NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="/user"  className="nav-link">User</NavLink>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="text" placeholder="Search"/>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <LoadingBar class="progress-bar" />

        <div className="content">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/user" component={UserList}/>
            <Route exact path="/user/create" component={UserCreate}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Layout;