import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

@connect((store) => {
  return {
    ...store
  };
})
class FooterSection extends React.Component {
  render() {
    return (
      <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4">section 1</div>
            <div class="col-md-4">section 2</div>
            <div class="col-md-4">section 3</div>
          </div>
        </div>
      </footer>
    );
  }
}

export default FooterSection;