import React, { Component } from "react";

import Setting from "../../setting";

import SwapiService from "../../../services/swapi-service";

class SettingPage extends Component {
  swapiService = new SwapiService();

  render() {
    return (
      <Setting
        getData={this.swapiService.SetSetting}
        getLogin={this.props.getLogin}
      />
    );
  }
}
export default SettingPage;
