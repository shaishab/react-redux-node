import React from "react"
import { connect } from "react-redux"

@connect((store) => {
  return {
    userStore: store.user
  };
})
export default class UserProfile extends React.Component {
  render() {
    var {user} = this.props.userStore;
    return (
      <div>
        <div class="row">
          <div class="col-md-4">
           <strong>User Information:</strong>
          </div>
        </div>
        <hr/>
        <div class="row">
          <div class="col-md-2">
            <div class="profile-avatar">
              <img class="img-fluid" src={!user.avater && '../../../public/common/default-avatar.png'}/>
            </div>
          </div>
          <div class="col-md-10">
            <div class="form-group row">
              <label class="col-sm-2">Email:</label>
              <label class="col-sm-10">{user.email}</label>
            </div>
            <div class="form-group row">
              <label class="col-sm-2">First name:</label>
              <label class="col-sm-10">{user.firstName}</label>
            </div>
            <div class="form-group row">
              <label class="col-sm-2">Last name:</label>
              <label class="col-sm-10">{user.lastName}</label>
            </div>
            <div class="form-group row">
              <label class="col-sm-2">Role:</label>
              <label class="col-sm-10">{user.role}</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}