import React, { Component } from "react";
import NewArticle from "../../newArticle";

import SwapiService from "../../../services/swapi-service";
export default class EditorPage extends Component {
  swapiService = new SwapiService();

  render() {
    return <NewArticle sendData={this.swapiService.getNewArtical} />;
  }
}
