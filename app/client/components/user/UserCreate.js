import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import {createUser} from "../../actions/userAction";

import { Field, reduxForm } from 'redux-form';

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div>
      <div class="row justify-content-between align-items-center">
        <div class="col-4">
         New user Information:
        </div>
        <div class="col-4">
          <Link to="/user" className="btn btn-primary btn-sm ">Back</Link>
        </div>
      </div>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
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
          <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
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
            <button type="submit" class="btn btn-primary" style={{marginRight: 5+'px'}} disabled={pristine || submitting}>Submit</button>
            <button type="button" class="btn btn-warning" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

let UserCreateForm =  reduxForm({
  form: 'simple'
})(SimpleForm);

let createHandlers = function(dispatch) {
  let createUserHandlers = function(data) {
    dispatch(createUser(data));
  };
  return {
    createUserHandlers
  };
};


@connect((store) => {
  return {
    ...store
  };
})
export default class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(this.props.dispatch);
  }
  render() {
    return <UserCreateForm onSubmit={this.handlers.createUserHandlers}/>
  }
}