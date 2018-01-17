import React from "react";
import { connect } from "react-redux";

@connect((store) => {
  return {
    ...store
  };
})
class LeftSidebar extends React.Component {
  render() {
    return (
      <div className="aside-left col-md-2">Left sidebar</div>
    );
  }
}

export default LeftSidebar;