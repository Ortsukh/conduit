import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

export default class FeedToggle extends Component {
  state = {
    globalfeed: true,
    login: true,
  };
  tagFind() {
    const { tagId } = this.props;
    const tag = tagId ? (
      <li _ngcontent-c0="" className="nav-item" hidden="">
        <Link to="/" _ngcontent-c0="" className="nav-link active">
          <i _ngcontent-c0="" className="ion-pound"></i>
          {tagId}
        </Link>
      </li>
    ) : null;
    return tag;
  }
  toggleGlobalPost() {
    let globalfeed = this.state.globalfeed;
    globalfeed = true;
    this.setState({ globalfeed });
    this.props.togglePost(globalfeed);
  }
  toggleYourPost() {
    if (!localStorage.getItem("token")) {
      this.setState({ login: false });
      return;
    }
    let globalfeed = this.state.globalfeed;
    globalfeed = false;
    this.setState({ globalfeed });
    this.props.togglePost(globalfeed);
  }
  render() {
    if (!this.state.login) {
      return <Redirect to={"/login"} />;
    }
    const tag = this.tagFind();
    let globalfeed = this.state.globalfeed;

    let globalPostClass = "";
    let yourPostClass = "";

    if (globalfeed) {
      globalPostClass = "nav-link active";
      yourPostClass = "nav-link ";
    } else {
      globalPostClass = "nav-link ";
      yourPostClass = "nav-link active";
    }
    return (
      <div _ngcontent-c0="" className="feed-toggle">
        <ul _ngcontent-c0="" className="nav nav-pills outline-active">
          <li _ngcontent-c0="" className="nav-item">
            <Link
              _ngcontent-c0=""
              className={yourPostClass}
              to="/"
              onClick={() => this.toggleYourPost()}
            >
              Your Feed
            </Link>
          </li>
          <li _ngcontent-c0="" className="nav-item">
            <Link
              _ngcontent-c0=""
              className={globalPostClass}
              to="/"
              onClick={() => this.toggleGlobalPost()}
            >
              Global Feed
            </Link>
          </li>
          {tag}
        </ul>
      </div>
    );
  }
}
