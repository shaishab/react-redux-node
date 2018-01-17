import React from "react"
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { Field, reduxForm } from 'redux-form'

import {getProfile, editProfile} from "../../actions/userAction"
import {textInput} from '../inputFields/InputFields'

const required = value => (value ? undefined : 'This field must not be empty');

const UserInfoForm = props => {
  const { handleSubmit, pristine, submitting } = props;
  return (
    <div>
      <div class="row justify-content-between align-items-center">
        <div class="col-6">
          <strong>Your Information</strong>
        </div>
        <div class="col-6 text-right">
          <Link to={`/profile`} className="btn btn-primary btn-sm ">Back</Link>
        </div>
      </div>
      <hr/>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <Field
            name="firstName"
            className="form-control"
            label="First Name:"
            component={textInput}
            type="text"
            validate={required}
          />
        </div>
        <div class="form-group">
          <Field
            name="lastName"
            className="form-control"
            label="Last Name:"
            component={textInput}
            type="text"
            validate={required}
          />
        </div>
        <div class="form-group">
          <Field
            name="email"
            className="form-control"
            label="Email:"
            component={textInput}
            type="email"
            validate={required}
          />
        </div>
        <div class="form-group">
          <Field
            name="designation"
            className="form-control"
            label="Designation:"
            component={textInput}
            type="text"
            validate={required}
          />
        </div>
        <div class="form-group">
          <Field
            name="webUrl"
            className="form-control"
            label="Personal site:"
            component={textInput}
            type="text"
            placeholder="web url"
          />
        </div>
        <div class="form-group">
          <Field
            name="stackOverflowProfile"
            className="form-control"
            label="Stack Overflow Profile:"
            component={textInput}
            type="text"
            placeholder="profile url"
          />
        </div>
        <div class="form-group">
          <Field
            name="gitHubProfile"
            className="form-control"
            label="GitHub Profile:"
            component={textInput}
            type="text"
            placeholder="profile url"
          />
        </div>
        <div class="form-group">
          <Field
            name="linkedInProfile"
            className="form-control"
            label="LinkedIn Profile:"
            component={textInput}
            type="text"
            placeholder="profile url"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary" disabled={pristine || submitting}>Submit</button>
        </div>
      </form>
    </div>
  );
};

let UserEditForm =  reduxForm({
  form: 'userEditForm',
  enableReinitialize: true
})(UserInfoForm);

let createHandlers = function(dispatch) {
  let profileEditHandlers = function(data) {
    dispatch(editProfile(data));
  };
  return {
    profileEditHandlers
  };
};


@connect((store) => {
  return {
    userStore: store.user
  };
})
export default class UserProfileEdit extends React.Component {
  constructor(props) {
    super(props);
    this.handlers = createHandlers(props.dispatch);
    props.dispatch(getProfile(props.userStore.user._id));
  }

  render() {
    var {user } = this.props.userStore;
    return <UserEditForm initialValues={user} onSubmit={this.handlers.profileEditHandlers}/>
  }
}