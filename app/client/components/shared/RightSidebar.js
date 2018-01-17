import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

@connect((store) => {
  return {
    ...store
  };
})
class RightSidebar extends React.Component {
  render() {
    return (
      <div className="aside-right col-md-3">Right sidebar</div>
    );
  }
}

export default RightSidebar;