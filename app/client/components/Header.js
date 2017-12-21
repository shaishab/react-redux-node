import React from "react";
import { connect } from "react-redux";
import { Link, NavLink } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import {userLogOut} from '../actions/userAction'
import avatar from '../../../public/common/default-avatar.png';

@connect((store) => {
  return {
    userStore: store.user
  };
})
class Header extends React.Component {
  render() {
    var {isLoggedIn, user} = this.props.userStore;
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
            <form class="form-inline my-2 my-lg-0 header-form">
              <input class="form-control mr-sm-2" type="text" placeholder="Search"/>
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <div>
              {!isLoggedIn && <Link class="btn btn-outline-success" to="/login">Login</Link>}
              {isLoggedIn && <ul class="nav nav-pills">
                <li class="nav-item dropdown header-avatar-parent">
                  <img class="nav-link dropdown-toggle text-center header-avatar img-fluid" data-toggle="dropdown" role="button" aria-haspopup="true"
                       aria-expanded="false" src={!user.avater && '../../../public/common/default-avatar.png'}/>

                  <div class="dropdown-menu">
                    <NavLink to="/user/profile"  className="dropdown-item">Profile</NavLink>
                    <a href="#"  className="dropdown-item" onClick={(e)=> {e.preventDefault(); this.props.dispatch(userLogOut())}}>Log Out</a>
                  </div>
                </li>
              </ul>
              }
            </div>
          </div>
        </nav>
        <LoadingBar class="progress-bar" />
      </div>
    );
  }
}

export default Header;