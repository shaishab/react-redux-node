import React from "react";
import { Route, Switch } from 'react-router'
import ReduxToastr from 'react-redux-toastr'

import HeaderSection from "./shared/Header"
import RightSidebar from "./shared/RightSidebar"
import LeftSidebar from "./shared/LeftSidebar"
import FooterSection from "./shared/Footer"
import Home from "./Home"

import UserList from "./user/UserList"
import UserProfile from "./user/UserProfile"
import UserProfileEdit from "./user/UserProfileEdit"
import Registration from "./user/Registration"
import Login from "./user/Login"


import NotFound from "./shared/NotFound"
import requireAuth from './shared/requireAuth'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <HeaderSection/>
        <main class="container-fluid">
          <div class="row">
            <LeftSidebar/>
            <div className="content col-md-7">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/user" component={UserList}/>
                <Route exact path="/profile" component={requireAuth(UserProfile)}/>
                <Route exact path="/profile/edit" component={requireAuth(UserProfileEdit)}/>
                <Route exact path="/registration" component={Registration}/>
                <Route exact path="/login" component={Login}/>
                <Route component={NotFound}/>
              </Switch>
              <ReduxToastr
                timeOut={4000}
                preventDuplicates
                transitionIn="bounceIn"
                transitionOut="fadeOut"/>
            </div>
            <RightSidebar/>
          </div>
        </main>
        <FooterSection/>
      </div>
    );
  }
}

export default Layout;