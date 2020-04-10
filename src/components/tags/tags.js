import React, { Component } from "react";
import { Link } from "react-router-dom";
import Error from "../error";

import SwapiService from "../../services/swapi-service";
import "./tags.css";

export default class Tags extends Component {
  swapiService = new SwapiService();
  state = {
    data: [],
    loading: true,
    error: false,
  };
  componentDidMount() {
    this.updateItem();
  }

  updateItem() {
    const { getData } = this.props;

    getData()
      .then((data) => {
        this.setState({ data, loading: false });
      })
      .catch(() => this.setState({ error: true }));
  }

  renderItems(arr) {
    return arr.map((item) => {
      return (
        <Link
          to=""
          _ngcontent-c0=""
          className="tag-default tag-pill"
          onClick={() => this.props.onTagSelected(item)}
          key={item}
        >
          {item}
        </Link>
      );
    });
  }

  render() {
    const { data, loading, error } = this.state;
    if (error) {
      return <Error />;
    }
    if (loading) {
      return (
        <div _ngcontent-c1="" className="app-article-preview" hidden="">
          Loading tags...
        </div>
      );
    }
    if (!data) {
      return (
        <div _ngcontent-c1="" className="app-article-preview" hidden="">
          No tags are here... yet.
        </div>
      );
    }
    const items = this.renderItems(data);

    return (
      <div _ngcontent-c0="" className="col-md-3">
        <div _ngcontent-c0="" className="sidebar">
          <p _ngcontent-c0="">Popular Tags</p>
          <div _ngcontent-c0="" className="tag-list">
            {items}
          </div>
        </div>
      </div>
    );
  }
}
