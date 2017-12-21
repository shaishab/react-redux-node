import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import {fetchUsers} from "../../actions/userAction"

@connect((store) => {
  return {
    userStore: store.user
  };
})
export default class UserList extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchUsers())
  }

  render() {
    var {users} = this.props.userStore;
    let mapUsers = [];
    if(users && users.length) {
      mapUsers = users.map(user => <li key={user._id}>User email is <strong>{user.email}</strong> and his status is <strong>{user.status}</strong></li>);
    }

    return <div>
      <div class="row justify-content-between align-items-center">
        <div class="col-6">
          <strong>User list bellow:</strong>
        </div>
        <div class="col-6 text-right">
          <Link to="/user/create" className="btn btn-primary btn-sm">Create User</Link>
        </div>
      </div>
      <hr/>
      <div>
        <ul>{mapUsers}</ul>
      </div>
    </div>
  }
}