import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Like from "../like";
import FollowButton from "../followButton";
import Error from "../error";

export default class Article extends Component {
  state = {
    data: [],
    loading: true,
    delete: false,
    error: false,
  };

  componentDidMount() {
    this.updateData();
  }
  updateData() {
    const { getData, articleId } = this.props;
    const token = localStorage.getItem("token");

    getData(articleId, token)
      .then((data) => {
        this.setState({ data, loading: false });
      })
      .catch(() => this.setState({ error: true }));
  }
  deleteItem() {
    const token = localStorage.getItem("token");
    const { deleteItem, articleId } = this.props;
    deleteItem(articleId, token).catch(() => this.setState({ error: true }));
    this.setState({ delete: true });
  }
  followButton(articleId, metod, islike) {
    const { author } = this.state.data;

    let path = "";
    if (islike) {
      path = "articles";
    } else {
      path = "profiles";
      articleId = author;
    }
    const token = localStorage.getItem("token");
    this.props
      .sendData(articleId, metod, token, path)
      .catch(() => this.setState({ error: true }));
  }
  toggle() {
    const username = localStorage.getItem("username");
    const { author } = this.state.data;
    const { articleId } = this.props;

    if (username === author) {
      return (
        <span>
          <Link
            className="btn btn-sm btn-outline-secondary"
            to="/editor/wad-3mn6mt"
          >
            <i className="ion-edit"></i> Edit Article
          </Link>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => this.deleteItem(articleId)}
          >
            <i className="ion-trash-a"></i> Delete Article
          </button>
        </span>
      );
    } else {
      let { favorited, favoritesCount } = this.state.data;
      const { follow } = this.state;

      const { articleId } = this.props;

      let metod = "";

      const toggleButton = (like) => {
        if (like) {
          let { favorite } = this.state;

          if (!favorite) {
            metod = "post";
            this.setState({ favorite: !favorite });
          } else {
            metod = "delete";
            this.setState({ favorite: !favorite });
          }
        } else {
          let { follow } = this.state;

          if (!follow) {
            metod = "post";
            this.setState({ follow: !follow });
          } else {
            this.setState({ follow: !follow });
            metod = "delete";
          }
        }
        this.followButton(articleId, metod, like);
      };

      return (
        <span>
          <FollowButton
            author={author}
            toggleFollow={toggleButton}
            follow={follow}
          />
          <Like
            favorited={favorited}
            favoritesCount={favoritesCount}
            onToggle={toggleButton}
            articleLike={true}
          />
        </span>
      );
    }
  }
  renderTags(arrTags) {
    return arrTags.map((item) => {
      return (
        <li className="tag-default tag-pill tag-outline" key={item}>
          {item}
        </li>
      );
    });
  }
  render() {
    const { error } = this.state;
    if (error) {
      return <Error />;
    }
    if (this.state.delete) {
      return <Redirect to={"/"} />;
    }
    const buttons = this.toggle();
    const {
      title,
      description,
      author,
      createdAt,
      tagList,
      authorImg,
    } = this.state.data;

    const tags = tagList ? this.renderTags(tagList) : null;

    const created = (createdAt + "").slice(0, 10);
    const urlAuthor = `/profile/${this.state.data.author}`;
    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{title}</h1>
            <app-article-meta>
              <div className="article-meta">
                <Link to={urlAuthor}>
                  <img src={authorImg} alt="author" />
                </Link>
                <div className="info">
                  <Link className="author" to={urlAuthor}>
                    >{author}
                  </Link>
                  <span className="date"> {created}</span>
                </div>
                {buttons}
              </div>
            </app-article-meta>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <div>
                <p>{description}</p>
              </div>
              <ul className="tag-list">{tags}</ul>
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}
