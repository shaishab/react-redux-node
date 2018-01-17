import React from "react"
import { connect } from "react-redux"
import { oAuthProviderFinalCall } from '../actions/userAction'

@connect((store) => {
  return {
    ...store
  };
})
class Home extends React.Component {
  constructor(props) {
    super();
    const { search } = props.location;
    if(search != '') {
      props.dispatch(oAuthProviderFinalCall(search));
    }
  }

  render() {
    return (
      <div>
        <h2>Hello react redux with node.js welcome to home page</h2>
      </div>
    );
  }
}

export default Home;