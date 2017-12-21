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
      mapUsers = users.map(user => <li key={user._id}>{user.email} and status is {user.status}</li>);
    }

    return <div>
      <div class="row justify-content-between align-items-center">
        <div class="col-4">
          <strong>User list bellow:</strong>
        </div>
        <div class="col-4">
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