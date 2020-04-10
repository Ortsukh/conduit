import React, { Component } from "react";
import SignUp from "../../sign-up";

import SwapiService from "../../../services/swapi-service";
export default class SignUpPage extends Component {
  swapiService = new SwapiService();

  render() {
    return (
      <SignUp
        sendData={this.swapiService.SignUp}
        getLogin={this.props.getLogin}
      />
    );
  }
}
