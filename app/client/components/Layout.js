import React from "react";
import { Route, Switch } from 'react-router'

import Header from "./Header"
import Home from "./Home"
import UserList from "./user/UserList"
import UserCreate from "./user/UserCreate"
import UserProfile from "./user/UserProfile"
import Login from "./Login"
import NotFound from "./NotFound"

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/user" component={UserList}/>
            <Route exact path="/user/create" component={UserCreate}/>
            <Route exact path="/user/profile" component={UserProfile}/>
            <Route exact path="/login" component={Login}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Layout;