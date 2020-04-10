import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../app-header";
import HomePage from "../homePage";

import EditorPage from "../pages/editorPage";
import ProfilPage from "../pages/profilPage";
import ArticlePage from "../pages/articlePage";
import SignInPage from "../pages/signInPage";
import SignUpPage from "../pages/signUpPage";
import SettingPage from "../pages/settingPage";

import SwapiService from "../../services/swapi-service";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
  }
  swapiService = new SwapiService();
  getLogin = (login) => {
    this.setState({ login: login });
  };

  render() {
    return (
      <Router>
        <AppHeader />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/login">
            <SignInPage getLogin={this.getLogin} />
          </Route>
          <Route path="/register">
            <SignUpPage getLogin={this.getLogin} />
          </Route>
          <Route path="/editor" component={EditorPage} />
          <Route path="/article" component={ArticlePage} />
          <Route path="/settings">
            <SettingPage getLogin={this.getLogin} />
          </Route>
          <Route path="/profile" component={ProfilPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
