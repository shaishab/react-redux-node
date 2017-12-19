import React from "react"
import { Link } from 'react-router-dom'

export default class NotFound extends React.Component {
  render() {
    return (
      <div>
        <div class="row text-center">
          <div class="col align-self-center">
            <h1>404</h1>
          </div>
        </div>
        <div class="row text-center">
          <div class="col align-self-center">
            <h4>
              <span class="oi oi-warning"></span>
              Oops! The page you requested was not found!
            </h4>
          </div>
        </div>
        <div class="row text-center">
          <div class="col-md-12">
            You can go to home page by click bellow button
          </div>
          <div class="col-md-12">
            <Link to="/" className="btn btn-info btn-sm">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }
}
