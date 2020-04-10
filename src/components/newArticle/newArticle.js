import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";
import { Redirect } from "react-router-dom";
import Error from "../error";

// import "./app-header.css";

export default class NewArticle extends Component {
  swapiService = new SwapiService();
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      title: "",
      description: "",
      body: "",
      tags: "",
      set: false,
      error: false,
    };
  }
  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
    event.preventDefault();
  };
  handleChangeDescription = (event) => {
    this.setState({ description: event.target.value });
    event.preventDefault();
  };
  handleChangeBody = (event) => {
    this.setState({ body: event.target.value });
    event.preventDefault();
  };
  handleChangeTags = (event) => {
    this.setState({ tags: event.target.value });
    event.preventDefault();
  };
  handleSubmit = (event) => {
    const { sendData } = this.props;
    const token = localStorage.getItem("token");

    const { title, description, body, tags } = this.state;
    sendData(title, description, body, tags, token)
      .then((item) => {
        this.setState({ item });
      })
      .catch(() => this.setState({ error: true }));

    event.preventDefault();
  };
  render() {
    const { error } = this.state;
    if (error) {
      return <Error />;
    }
    if (this.state.item.slug) {
      return <Redirect to={`/article/${this.state.item.slug}`} />;
    }

    return (
      <app-editor-page>
        <div className="editor-page">
          <div className="container page">
            <div className="row">
              <div className="col-md-10 offset-md-1 col-xs-12">
                <app-list-errors>
                  <ul className="error-messages"></ul>
                </app-list-errors>
                <form
                  noValidate=""
                  className="ng-untouched ng-pristine ng-valid"
                  onSubmit={this.handleSubmit}
                >
                  <fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg ng-untouched ng-pristine ng-valid"
                        formcontrolname="title"
                        placeholder="Article Title"
                        type="text"
                        onChange={this.handleChangeTitle}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control ng-untouched ng-pristine ng-valid"
                        formcontrolname="description"
                        placeholder="What's this article about?"
                        type="text"
                        onChange={this.handleChangeDescription}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <textarea
                        className="form-control ng-untouched ng-pristine ng-valid"
                        formcontrolname="body"
                        placeholder="Write your article (in markdown)"
                        rows="8"
                        onChange={this.handleChangeBody}
                      ></textarea>
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control ng-untouched ng-pristine ng-valid"
                        placeholder="Enter tags"
                        type="text"
                        onChange={this.handleChangeTags}
                      />
                      <div className="tag-list"></div>
                    </fieldset>
                    <button
                      className="btn btn-lg pull-xs-right btn-primary"
                      type="submit"
                    >
                      Publish Article
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </app-editor-page>
    );
  }
}
