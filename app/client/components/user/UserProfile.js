import React from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import history from '../../history'

@connect((store) => {
  return {
    userStore: store.user
  };
})
export default class UserProfile extends React.Component {
  render() {
    let {user} = this.props.userStore;

    function gettingStackOverflowFlair(url) {
      if (!url) {
        return '';
      }
      var lastIndex = url.lastIndexOf('/');
      var subStr = url.substr(0, lastIndex);
      var currentIndex = subStr.lastIndexOf('/');
      return subStr.substr(0, currentIndex) + '/flair/' + subStr.substr(currentIndex + 1) + '.png';
    }

    return (
      <section>
        <div class="row justify-content-between">
          <div class="col-md-4">
            <h2>Profile</h2>
          </div>
          <div class="col-md-4 align-self-center text-right">
            <Link to={`profile/edit`} className="btn btn-primary btn-sm"><i className="fa fa-edit"><span> Edit</span></i></Link>
          </div>
        </div>

        <hr/>
        { user && <div class="profile-header">
          <div class="profile-pic-point">
            { user.profileImageURL && <img class="img-fluid mx-auto d-block" src={user.profileImageURL.toString()}/>}
          </div>
          <div class="profile-info">
            <h2 class="profile-name">{ user.displayName}</h2>
            {user.designation && <div class="profile-designation">{user.designation}</div>}
            <div class="profile-email">{user.email}</div>
            {user.webUrl && <div class="social-btn-container align-self-center">
              <Link class="btn btn-tw" to={user.webUrl} target="_blank">
                <i class="fa fa-cloud pull-left"><span> Personal site</span></i>
              </Link>
            </div>}
            {user.linkedInProfile && <div class="social-btn-container align-self-center">
              <Link class="btn btn-ln" to={user.linkedInProfile} target="_blank">
                <i class="fa fa-linkedin pull-left"><span> LinkedIn Profile</span></i>
              </Link>
            </div>}
            {user.gitHubProfile && <div class="social-btn-container align-self-center">
              <Link class="btn btn-gh" to={user.gitHubProfile} target="_blank">
                <i class="fa fa-github pull-left"><span> GitHub Profile</span></i>
              </Link>
            </div>}
            {user.stackOverflowProfile && <div>
              <Link to={user.stackOverflowProfile} target="_blank">
                <img src={gettingStackOverflowFlair(user.stackOverflowProfile)} width="208" height="58"/>
              </Link>
            </div>}
          </div>
        </div>}
      </section>
  );
  }
}