import React from 'react';
import { connect } from "react-redux"
import history from '../../history'

@connect((store) => {
  return {
    ...store
  };
})
export default function requireAuth (Component) {
  return class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      this.checkAuth();
    }

    checkAuth() {
      let { isLoggedIn } = this.props.user;
      if (!isLoggedIn) {
        const location = this.props.location;
        const redirect = location ? 'redirect='+location.pathname + location.search : '';
        history.push(`/login?${redirect}`);
      }
    }

    render() {
      let { isLoggedIn } = this.props.user;
      return isLoggedIn ? <Component { ...this.props } /> : null
    }
  };
}
