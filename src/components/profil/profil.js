import React, { Component } from "react";
import { Link } from "react-router-dom";

import AllArticles from "../allArticles";
import Pagination from "../pagination";
import FollowButton from "../followButton";
import SwapiService from "../../services/swapi-service";
import Error from "../error";

export default class Profil extends Component {
  swapiService = new SwapiService();

  state = {
    id: 0,
    data: [],
    loading: true,
    mypost: true,
    follow: false,
    error: false,
  };
  componentDidMount() {
    this.updateData();
  }

  updateData() {
    const { getData } = this.props;
    const token = localStorage.getItem("token");
    const author = this.props.authorName;

    getData(author, token)
      .then((data) => {
        this.setState({ data, loading: false });
        this.setState({ follow: this.state.data.following });
      })
      .catch(() => this.setState({ error: true }));
  }
  toggleFavotitePost() {
    let mypost = this.state.mypost;
    mypost = false;
    this.setState({ mypost });
  }
  toggleMyPost() {
    let mypost = this.state.mypost;
    mypost = true;
    this.setState({ mypost });
  }
  getFollow(username, metod) {
    const token = localStorage.getItem("token");
    const path = "profiles";
    this.props
      .sendData(username, metod, token, path)
      .catch(() => this.setState({ error: true }));
  }
  toggle() {
    const username = localStorage.getItem("username");
    const author = this.props.authorName;

    if (username === author) {
      return (
        <Link
          className="btn btn-sm btn-outline-secondary action-btn"
          to="/settings"
        >
          <i className="ion-gear-Link"></i> Edit Profile Settings
        </Link>
      );
    } else {
      let metod = "";

      const { follow } = this.state;

      const togglefollow = () => {
        let { follow } = this.state;

        if (!follow) {
          metod = "post";
          this.setState({ follow: !follow });
        } else {
          this.setState({ follow: !follow });
          metod = "delete";
        }
        this.getFollow(author, metod);
      };
      return (
        <FollowButton
          author={author}
          toggleFollow={togglefollow}
          follow={follow}
        />
      );
    }
  }
  render() {
    const { username, bio, image } = this.state.data;
    const { mypost, error } = this.state;
    const favoriteUrl = `/profile/${username}/favorites`;
    const mypostUrl = `/profile/${username}`;
    const buttons = this.toggle();
    let myPastClass = "";
    let favoriteClass = "";
    if (error) {
      return <Error />;
    }
    if (mypost) {
      myPastClass = "nav-link active";
      favoriteClass = "nav-link ";
    } else {
      myPastClass = "nav-link ";
      favoriteClass = "nav-link active";
    }

    return (
      <app-profile-page>
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img className="user-img" src={image} alt="" />
                  <h4>{username}</h4>
                  <p>{bio}</p>
                  {buttons}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <li className="nav-item">
                      <Link
                        className={myPastClass}
                        routerlinkactive="active"
                        to={mypostUrl}
                        onClick={() => this.toggleMyPost()}
                      >
                        My Posts
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className={favoriteClass}
                        routerlinkactive="active"
                        to={favoriteUrl}
                        onClick={() => this.toggleFavotitePost()}
                      >
                        Favorited Posts
                      </Link>
                    </li>
                  </ul>
                </div>
                <router-outlet></router-outlet>
                <app-profile-articles>
                  <app-article-list _ngcontent-c0="" _nghost-c1="">
                    <AllArticles
                      getData={this.swapiService.getAllArticles}
                      username={this.props.authorName}
                      id={this.state.id}
                      tagId={this.state.tagId}
                      sendData={this.swapiService.sendFavorite}
                      favorites={!this.state.mypost}
                    />
                    <Pagination
                      onItemSelected={(id) => {
                        this.setState({ id });

                        window.scrollTo(0, 0);
                      }}
                      id={this.state.id}
                      username={this.props.authorName}
                      getData={this.swapiService.getArticlesCount}
                      favorites={!this.state.mypost}
                    />
                  </app-article-list>
                </app-profile-articles>
              </div>
            </div>
          </div>
        </div>
      </app-profile-page>
    );
  }
}
