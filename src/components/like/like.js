import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Like extends Component {
  state = {
    isFavorited: false,
    favoritesCounter: 0,
    login: true,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.favorited !== this.props.favorited) {
      this.updateItem();
    }
  }
  componentDidMount() {
    this.updateItem();
  }
  updateItem() {
    const { favorited, favoritesCount } = this.props;
    this.setState({ isFavorited: favorited, favoritesCounter: favoritesCount });
  }
  toggleLike() {
    const islike = true;
    const { isFavorited, favoritesCounter } = this.state;
    if (!localStorage.getItem("token")) {
      this.setState({ login: false });
      return;
    }
    this.props.onToggle(islike);
    if (!isFavorited) {
      this.setState({
        isFavorited: true,
        favoritesCounter: favoritesCounter + 1,
      });
    } else {
      this.setState({
        isFavorited: false,
        favoritesCounter: favoritesCounter - 1,
      });
    }
  }
  renderLike(favorite, favoritesCounter, articleLike) {
    if (articleLike) {
      return (
        <button className={favorite}>
          <i className="ion-heart"></i> Favorite Article
          <span className="counter">({favoritesCounter})</span>
        </button>
      );
    } else {
      return (
        <button className={favorite}>
          <i className="ion-heart"></i> {favoritesCounter}
        </button>
      );
    }
  }
  render() {
    if (!this.state.login) {
      return <Redirect to={"/login"} />;
    }
    const { isFavorited, favoritesCounter } = this.state;
    const articleLike = this.props.articleLike;
    let className = "";
    if (!articleLike) {
      className = "pull-xs-right";
    }
    let favorite = "";
    if (!isFavorited) {
      favorite = "btn btn-sm btn-outline-primary";
    } else {
      favorite = "btn btn-sm btn-primary";
    }
    const items = this.renderLike(favorite, favoritesCounter, articleLike);

    return (
      <app-favorite-button onClick={() => this.toggleLike()} class={className}>
        {items}
      </app-favorite-button>
    );
  }
}

export default Like;
