import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";
import AllArticles from "../allArticles";
import Pagination from "../pagination";
import Tags from "../tags";
import FeedToggle from "../feed_toggle";

export default class MainPage extends Component {
  swapiService = new SwapiService();
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      tagId: null,
      togglePost: false,
    };
  }

  renderItems() {
    return (
      <div>
        <div _ngcontent-c0="" className="container page">
          <div _ngcontent-c0="" className="row">
            <div _ngcontent-c0="" className="col-md-9">
              <FeedToggle
                tagId={this.state.tagId}
                togglePost={(globalPost) =>
                  this.setState({ togglePost: !globalPost })
                }
              />

              <app-article-list _ngcontent-c0="" _nghost-c1="">
                <AllArticles
                  getData={this.swapiService.getAllArticles}
                  getTagData={this.swapiService.getAllArticlesTag}
                  id={this.state.id}
                  tagId={this.state.tagId}
                  sendData={this.swapiService.sendFavorite}
                  yourPost={this.state.togglePost}
                  getYourPost={this.swapiService.getYourPost}
                />
                <Pagination
                  onItemSelected={(id) => {
                    this.setState({ id });

                    window.scrollTo(0, 0);
                  }}
                  id={this.state.id}
                  getData={this.swapiService.getArticlesCount}
                  yourPost={this.state.togglePost}
                  getYourPost={this.swapiService.getYourPost}
                />
              </app-article-list>
            </div>
            <Tags
              onTagSelected={(tagId) => {
                this.setState({ tagId });
              }}
              getData={this.swapiService.getAllTags}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const items = this.renderItems();

    return <ul>{items}</ul>;
  }
}
