import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Profil from "../../profil";

import SwapiService from "../../../services/swapi-service";

class ProfilSet extends Component {
  swapiService = new SwapiService();

  render() {
    let location = this.props.location.pathname + "";
    location = location.slice(9, location.length);

    if (location.indexOf("/") !== -1) {
      location = location.slice(0, location.lastIndexOf("/"));
    }

    return (
      <Profil
        getItem={this.swapiService.getProfilArtical}
        getData={this.swapiService.getProfil}
        getTagData={this.swapiService.getAllArticlesTag}
        authorName={location}
        sendData={this.swapiService.sendFavorite}
      />
    );
  }
}

const ProfilPage = withRouter(ProfilSet);

export default ProfilPage;
