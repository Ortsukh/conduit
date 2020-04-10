import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Article from "../../article";

import SwapiService from "../../../services/swapi-service";

class Editor extends Component {
  swapiService = new SwapiService();

  render() {
    let location = this.props.location.pathname + "";
    location = location.slice(9, location.length);

    return (
      <Article
        getData={this.swapiService.getArticl}
        articleId={location}
        deleteItem={this.swapiService.deleteItem}
        sendData={this.swapiService.sendFavorite}
      />
    );
  }
}
const EditorPage = withRouter(Editor);
export default EditorPage;
