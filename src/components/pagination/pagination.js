import React, { Component } from "react";
import { Link } from "react-router-dom";
import Error from "../error";

// import "./pagination.css";
import SwapiService from "../../services/swapi-service";

export default class Pagination extends Component {
  swapiService = new SwapiService();
  state = {
    data: null,
    error: false,
  };
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
  componentDidMount() {
    this.updateItem();
  }

  render() {
    const { data, error } = this.state;
    const { id } = this.props;
    if (error) {
      return <Error />;
    }
    if (data < 11) {
      return null;
    }
    let arrItems = [];
    for (let i = 0; i < data / 10 + 1; i++) {
      if (i === id) {
        arrItems.push(
          <li
            _ngcontent-c1=""
            className="page-item active"
            onClick={() => this.props.onItemSelected(i)}
            key={i}
          >
            <Link _ngcontent-c1="" className="page-link" to="">
              {i + 1}
            </Link>
          </li>
        );
      } else {
        arrItems.push(
          <li
            _ngcontent-c1=""
            className="page-item "
            onClick={() => this.props.onItemSelected(i)}
            key={i}
          >
            <Link _ngcontent-c1="" className="page-link" to="">
              {i + 1}
            </Link>
          </li>
        );
      }
    }

    return (
      <nav _ngcontent-c1="">
        <ul _ngcontent-c1="" className="pagination">
          {arrItems}
        </ul>
      </nav>
    );
  }
}
