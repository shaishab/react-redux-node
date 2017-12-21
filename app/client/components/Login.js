import React from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import {userLogin} from "../actions/userAction"

import { Field, reduxForm } from 'redux-form'

const SimpleLogInForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div>
      <div class="row">
        <div class="col-4">
          User login Information:
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
            <button type="button" class="btn btn-warning" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </div>
      </form>
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
  }
  render() {
    return <UserLoginForm onSubmit={this.handlers.userLoginHandler}/>
  }
}