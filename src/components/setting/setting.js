import React, { Component } from "react";
import SwapiService from "../../services/swapi-service";

import { Redirect } from "react-router-dom";
import Error from "../error";

// import "./app-header.css";

export default class Setting extends Component {
  swapiService = new SwapiService();
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      username: "",
      bio: "",
      img: "",
      email: "",
      password: "",
      errors: "",
      set: false,
      logout: false,
      error: false,
    };
  }
  componentDidMount() {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    let img = localStorage.getItem("img");

    this.setState({ username, email });
    img = img + "";

    if (img !== "null") {
      this.setState({ img: img });
    }
  }
  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
    event.preventDefault();
  };
  handleChangeImg = (event) => {
    this.setState({ img: event.target.value });

    event.preventDefault();
  };
  handleChangeBio = (event) => {
    this.setState({ bio: event.target.value });
    event.preventDefault();
  };
  handleChangeName = (event) => {
    this.setState({ username: event.target.value });
    event.preventDefault();
  };
  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
    event.preventDefault();
  };
  handleSubmit = (event) => {
    const { getData } = this.props;
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const { email, password, bio, img, username } = this.state;
    getData(id, email, password, username, img, bio, token)
      .then((data) => {
        this.setState({ data });
        if (data.username) {
          localStorage.setItem("username", `${this.state.data.username}`);
          localStorage.setItem("email", `${this.state.data.email}`);
          localStorage.setItem("img", `${this.state.data.image}`);
          this.setState({
            set: true,
          });
        }
      })
      .catch(() => this.setState({ error: true }));

    event.preventDefault();
  };
  logout() {
    localStorage.clear();
    this.setState({
      logout: true,
    });

    this.props.getLogin(true);
  }
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

    if (this.state.logout) {
      return <Redirect to={"/"} />;
    }
    const username = localStorage.getItem("username");
    const url = `/profile/${username}`;

    if (this.state.set) {
      return <Redirect to={url} />;
    }
    const errors = this.error();
    return (
      <app-settings-page>
        <div className="settings-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-6 offset-md-3 col-xs-12">
                <h1 className="text-xs-center">Your Settings</h1>
                <app-list-errors>
                  <ul className="error-messages"> {errors}</ul>
                </app-list-errors>
                <form
                  noValidate=""
                  className="ng-untouched ng-pristine ng-valid"
                  onSubmit={this.handleSubmit}
                >
                  <fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control ng-untouched ng-pristine ng-valid"
                        formcontrolname="image"
                        placeholder="URL of profile picture"
                        type="text"
                        value={this.state.img}
                        onChange={this.handleChangeImg}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                        formcontrolname="username"
                        placeholder="username"
                        value={this.state.username}
                        onChange={this.handleChangeName}
                        type="text"
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <textarea
                        className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                        formcontrolname="bio"
                        placeholder="Short bio about you"
                        rows="8"
                        onChange={this.handleChangeBio}
                      ></textarea>
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                        formcontrolname="email"
                        placeholder="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChangeEmail}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                        formcontrolname="password"
                        placeholder="New Password"
                        type="password"
                        onChange={this.handleChangePassword}
                      />
                    </fieldset>
                    <button
                      className="btn btn-lg btn-primary pull-xs-right"
                      type="submit"
                    >
                      Update Settings
                    </button>
                  </fieldset>
                </form>
                <hr />

                <button
                  className="btn btn-outline-danger"
                  onClick={() => this.logout()}
                >
                  Or click here to logout.
                </button>
              </div>
            </div>
          </div>
        </div>
      </app-settings-page>
    );
  }
}
