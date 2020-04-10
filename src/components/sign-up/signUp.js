import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import SwapiService from "../../services/swapi-service";
import { Link } from "react-router-dom";
import Error from "../error";

export default class SignUp extends Component {
  swapiService = new SwapiService();
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      email: "",
      password: "",
      username: "",
      error: false,
    };
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
    event.preventDefault();
  };
  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  handleSubmit = (event) => {
    const { sendData } = this.props;
    const { email, password, username } = this.state;

    sendData(email, password, username)
      .then((data) => {
        this.setState({ data });
        if (this.state.data.token) {
          localStorage.setItem("token", this.state.data.token);
          localStorage.setItem("username", this.state.data.username);
          localStorage.setItem("email", this.state.data.email);
          localStorage.setItem("img", this.state.data.image);
          this.props.getLogin(true);
        }
      })
      .catch(() => this.setState({ error: true }));
    event.preventDefault();
  };

  error() {
    const { email, password, usernameErrors } = this.state.data;
    const emailError = email ? <li> email {email} </li> : null;
    const usernameError = usernameErrors ? (
      <li> username {usernameErrors} </li>
    ) : null;
    const passwordError = password ? <li> password {password} </li> : null;
    return (
      <app-list-errors>
        <ul className="error-messages">
          {emailError}
          {passwordError}
          {usernameError}
        </ul>
      </app-list-errors>
    );
  }
  render() {
    const { error } = this.state;
    if (error) {
      return <Error />;
    }
    const errors = this.error();

    if (this.state.data.token) {
      return <Redirect to={"/"} />;
    }
    return (
      <app-auth-page>
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign up</h1>
                <p className="text-xs-center">
                  <Link to="/login">Have an account?</Link>
                </p>
                {errors}
                <form
                  noValidate=""
                  className="ng-untouched ng-pristine ng-invalid"
                  onSubmit={this.handleSubmit}
                >
                  <fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                        formcontrolname="username"
                        placeholder="Username"
                        type="text"
                        onChange={this.handleChangeUsername}
                        value={this.state.username}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
                        formcontrolname="email"
                        placeholder="Email"
                        type="text"
                        onChange={this.handleChangeEmail}
                        value={this.state.email}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg ng-untouched ng-pristine ng-invalid"
                        formcontrolname="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChangePassword}
                        value={this.state.password}
                      />
                    </fieldset>
                    <button
                      className="btn btn-lg btn-primary pull-xs-right"
                      type="submit"
                      disabled=""
                    >
                      Sign Up
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </app-auth-page>
    );
  }
}
