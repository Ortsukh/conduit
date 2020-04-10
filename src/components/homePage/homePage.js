import React, { Component } from "react";
import MainPage from "../mainPage";
import SwapiService from "../../services/swapi-service";

class HomePage extends Component {
  swapiService = new SwapiService();
  render() {
    return (
      <app-home-page _nghost-c0="">
        <div _ngcontent-c0="" className="home-page">
          <div _ngcontent-c0="" className="banner">
            <div _ngcontent-c0="" className="container">
              <h1 _ngcontent-c0="" className="logo-font">
                conduit
              </h1>
              <p _ngcontent-c0="">
                A place to share your <i _ngcontent-c0="">Angular</i> knowledge.
              </p>
            </div>
          </div>
        </div>
        <MainPage />
      </app-home-page>
    );
  }
}

export default HomePage;
