import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./app-header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      isImage: false,
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token) {
      this.setState = () => {
        return { login: true };
      };
    }
  }

  nav(token, username) {
    let location = this.props.location.pathname + "";
    location = location.slice(1, location.length);
    if (location.indexOf("/") !== -1) {
      location = location.slice(0, location.lastIndexOf("/"));
    }

    let homeClass = "nav-link ";
    let editorClass = "nav-link ";
    let settingClass = "nav-link ";
    let profileClass = "nav-link ";
    let loginClass = "nav-link ";
    let registerClass = "nav-link ";

    switch (location) {
      case "editor":
        editorClass += "active";
        break;
      case "settings":
        settingClass += "active";
        break;
      case "profile":
        profileClass += "active";
        break;
      case "login":
        loginClass += "active";
        break;
      case "register":
        registerClass += "active";
        break;
      default:
        homeClass += "active";

        break;
    }

    let img = localStorage.getItem("img");
    img = img + "";

    const image =
      img !== "null" ? <img className="user-pic" src={img} alt="" /> : null;

    const url = `/profile/${username}`;
    let navbar;
    if (!token) {
      navbar = (
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className={homeClass} routerlink="/" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={loginClass}
              routerlink="/login"
              routerlinkactive="active"
              to="/login"
            >
              Sign in
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={registerClass}
              routerlink="/register"
              routerlinkactive="active"
              to="/register"
            >
              Sign up
            </Link>
          </li>
        </ul>
      );
    } else {
      navbar = (
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link
              className={homeClass}
              routerlink="/"
              routerlinkactive="active"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={editorClass}
              routerlink="/editor"
              routerlinkactive="active"
              to="/editor"
            >
              <i className="ion-compose"></i>&nbsp;New Article
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={settingClass}
              routerlink="/settings"
              routerlinkactive="active"
              to="/settings"
            >
              <i className="ion-gear-Link"></i>&nbsp;Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link className={profileClass} routerlinkactive="active" to={url}>
              {image}
              {/* <img className="user-pic" src={img} alt="user" /> */}
              {username}
            </Link>
          </li>
        </ul>
      );
    }
    return navbar;
  }

  render() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const navbar = this.nav(token, username);
    return (
      <app-layout-header>
        <nav className="navbar navbar-light">
          <div className="container">
            <Link className="navbar-brand" routerlink="/" to="/">
              conduit
            </Link>
            {navbar}
          </div>
        </nav>
      </app-layout-header>
    );
  }
}
const AppHeader = withRouter(Header);
export default AppHeader;
