import React from "react"
import { Link } from 'react-router-dom'

export default class SocialAuthProviders extends React.Component {
  render() {
    return (
      <section  class="row">
        <div class="col-md-12">
          <div class="col-md-12 sign-in-up-body">
            <div class="col-md-12 social-part text-center">
              <fieldset class="fieldset-border">
                <legend>With social account:</legend>

                <div class="social-btn-container align-self-center">
                  <Link class="btn btn-fb" to="/api/auth/facebook">
                    <i class="fa fa-facebook-square pull-left" aria-hidden="true"><span> With Facebook Account</span></i>
                  </Link>
                </div>
                <div class="social-btn-container align-self-center">
                  <Link class="btn btn-gg" to="/api/auth/google">
                    <i class="fa fa-google-plus-square pull-left" aria-hidden="true"> <span> With Google Account</span></i>
                  </Link>
                </div>
                <div class="social-btn-container align-self-center">
                  <Link class="btn btn-gh" to='/api/auth/github'>
                    <i class="fa fa-github pull-left"><span> With Git Hub Account</span></i>
                  </Link>
                </div>
              </fieldset>

            </div>
          </div>
        </div>
      </section>
    );
  }
}