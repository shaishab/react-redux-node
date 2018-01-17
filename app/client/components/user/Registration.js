import React from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import {userRegistration} from "../../actions/userAction"
import SocialAuthProviders from './SocialAuthProviders'

import { Field, reduxForm } from 'redux-form';

const RegistrationForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <div>
      <div class="row justify-content-between align-items-center">
        <div class="col-6">
          <strong>Registration Information</strong>
        </div>
        <div class="col-6 text-right">
          <Link to="/user" className="btn btn-primary btn-sm ">Back</Link>
        </div>
      </div>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">First Name</label>
          <div class="col-sm-10">
            <Field
              name="firstName"
              class="form-control"
              component="input"
              type="text"
              placeholder="Shaishab"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Last Name</label>
          <div class="col-sm-10">
            <Field
              name="lastName"
              class="form-control"
              component="input"
              type="text"
              placeholder="Roy"
            />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label">Email</label>
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
          <label class="col-sm-2 col-form-label">Password </label>
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
            <button type="submit" class="btn btn-primary" style={{marginRight: 5+'px'}} disabled={pristine || submitting}>Submit</button>
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

let UserRegistrationForm =  reduxForm({
  form: 'registrationForm'
})(RegistrationForm);

let createHandlers = function(dispatch) {
  let userRegistrationHandlers = function(data) {
    dispatch(userRegistration(data));
  };
  return {
    userRegistrationHandlers
  };
};


@connect((store) => {
  return {
    ...store
  };
})
export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }
  render() {
    return <UserRegistrationForm onSubmit={this.handlers.userRegistrationHandlers}/>
  }
}