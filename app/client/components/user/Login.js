import React from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import {userLogin} from "../../actions/userAction"
import SocialAuthProviders from './SocialAuthProviders'

const SimpleLogInForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div>
      <div class="row justify-content-between">
        <div class="col-4">
          <strong>User login Information:</strong>
        </div>
        <div class="col-5">
          <strong>Not Registered ? </strong>
          <Link to="/registration" className="btn btn-primary btn-sm">Registration</Link>
        </div>
      </div>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <Field
              name="email"
              class="form-control"
              component="input"
              type="email"
              placeholder="xxx@gmail.com"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-2 col-form-label">Password </label>
          <div class="col-sm-10">
            <Field
              name="password"
              class="form-control"
              component="input"
              type="password"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="offset-sm-2 col-sm-10">
            <button type="submit" class="btn btn-primary" style={{marginRight: 5+'px'}} disabled={pristine || submitting}>Login</button>
          </div>
        </div>
      </form>
      <div class="text-center">
        <fieldset class="divider-fieldset">
          <legend>OR</legend>
        </fieldset>
      </div>
      <SocialAuthProviders/>
    </div>
  );
};

let UserLoginForm =  reduxForm({
  form: 'loginForm'
})(SimpleLogInForm);

let createHandlers = function(dispatch) {
  let userLoginHandler = function(data) {
    dispatch(userLogin(data));
  };
  return {
    userLoginHandler
  };
};


@connect((store) => {
  return {
    ...store
  };
})
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
    localStorage.removeItem('user');
  }
  render() {
    return <UserLoginForm onSubmit={this.handlers.userLoginHandler}/>
  }
}