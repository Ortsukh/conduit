import React, { Component } from "react";
import SignIn from "../../sign-in";

import SwapiService from "../../../services/swapi-service";
export default class SignInPage extends Component {
  swapiService = new SwapiService();

  render() {
    return (
      <SignIn
        sendData={this.swapiService.SignIn}
        getLogin={this.props.getLogin}
      />
    );
  }
}
