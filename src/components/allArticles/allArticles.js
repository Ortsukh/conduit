import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";
import Like from "../like";
import Error from "../error";

export default class AllArticles extends Component {
  swapiService = new SwapiService();
  state = {
    data: [],
    loading: true,
    error: false,
  };
  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      this.updateItem();
    } else if (prevProps.tagId !== this.props.tagId) {
      this.updateItem();
    } else if (prevProps.favorites !== this.props.favorites) {
      this.updateItem();
    } else if (prevProps.yourPost !== this.props.yourPost) {
      this.updateItem();
    }
  }

  updateItem() {
    const {
      tagId,
      id,
      getData,
      username,
      favorites,
      yourPost,
      getYourPost,
    } = this.props;
    const idPage = 10 * id;
    let token = "";
    if (localStorage.getItem("token") !== null) {
      token = localStorage.getItem("token");
    }

    if (yourPost) {
      getYourPost(token)
        .then((data) => {
          this.setState({ data, loading: false });
        })
        .catch(() => this.setState({ error: true }));
    } else {
      getData(idPage, tagId, username, favorites, token)
        .then((data) => {
          this.setState({ data, loading: false });
        })
        .catch(() => this.setState({ error: true }));
    }
  }

  likeCounter(articleId, metod) {
    const token = localStorage.getItem("token");
    const path = "articles";
    this.props
      .sendData(articleId, metod, token, path)
      .catch(() => this.setState({ error: true }));
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
  renderItems(arr) {
    return arr.map((item) => {
      const urlArtical = `/article/${item.slug}`;
      let metod = "";

      const toggleLike = () => {
        if (!item.favorited) {
          metod = "post";
          item.favorited = !item.favorited;
        } else {
          metod = "delete";
          item.favorited = !item.favorited;
        }

        this.likeCounter(item.slug, metod);
      };

      let tags = this.renderTags(item.tagList);
      let createdAt = item.createdAt.slice(0, 10);
      const urlAuthor = `/profile/${item.author}`;
      return (
        <app-article-preview _ngcontent-c1="" key={item.slug}>
          <div className="article-preview">
            <app-article-meta>
              <div className="article-meta">
                <a href={urlAuthor}>
                  <img src={item.authorImg} alt="Author" />
                </a>
                <div className="info">
                  <a className="author" href={urlAuthor}>
                    {item.author}
                  </a>
                  <span className="date"> {createdAt} </span>
                </div>
                <Like
                  favorited={item.favorited}
                  favoritesCount={item.favoritesCount}
                  onToggle={toggleLike}
                />
              </div>
            </app-article-meta>
            <a className="preview-link" href={urlArtical}>
              <h1>{item.title}</h1>
              <p>{item.discription}</p>
              <span>Read more...</span>
              <ul className="tag-list">{tags}</ul>
            </a>
          </div>
        </app-article-preview>
      );
    });
  }

  render() {
    const { data, loading, error } = this.state;
    if (loading) {
      return (
        <div _ngcontent-c1="" className="app-article-preview" hidden="">
          Loading articles.
        </div>
      );
    }
    if (error) {
      return <Error />;
    }

    if (!data) {
      return (
        <div _ngcontent-c1="" className="app-article-preview" hidden="">
          No articles are here... yet.
        </div>
      );
    }
    const items = this.renderItems(data);
    return <ul>{items}</ul>;
  }
}
