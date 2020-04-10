import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";
import { Link, Redirect } from "react-router-dom";
import Error from "../error";

export default class SignUp extends Component {
  swapiService = new SwapiService();
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      email: "",
      password: "",
      errors: "",
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
    const { email, password } = this.state;

    sendData(email, password)
      .then((data) => {
        this.setState({ data });
        if (this.state.data.token) {
          localStorage.setItem("id", this.state.data.id);

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
    const Error = this.state.data.errors ? (
      <li> email or password is invalid</li>
    ) : null;

    return (
      <app-list-errors>
        <ul className="error-messages">{Error}</ul>
      </app-list-errors>
    );
  }
  button() {
    return (
      <button
        className="btn btn-lg btn-primary pull-xs-right"
        type="submit"
        disabled=""
      >
        Sign in
      </button>
    );
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <Error />;
    }
    const errors = this.error();
    const button = this.button();
    if (this.state.data.token) {
      return <Redirect to={"/"} />;
    }
    return (
      <app-auth-page>
        <div className="auth-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Sign in</h1>
                <p className="text-xs-center">
                  <Link to="/register">Need an account?</Link>
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

                    {button}
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
