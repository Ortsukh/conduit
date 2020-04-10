import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class FollowButton extends Component {
  state = {
    isFollow: false,
    login: true,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.follow !== this.props.follow) {
      this.updateItem();
    }
  }
  componentDidMount() {
    this.updateItem();
  }
  updateItem() {
    const { follow } = this.props;
    this.setState({ isFollow: follow });
  }
  toggleLike() {
    const { isFollow } = this.state;

    if (!localStorage.getItem("token")) {
      this.setState({ login: false });
      return;
    }
    this.props.toggleFollow();
    if (!isFollow) {
      this.setState({
        isFollow: true,
      });
    } else {
      this.setState({
        isFollow: false,
      });
    }
  }
  render() {
    if (!this.state.login) {
      return <Redirect to={"/login"} />;
    }
    const { author } = this.props;
    const { isFollow } = this.state;
    let active = "";
    let actionbtn = "";
    if (isFollow) {
      active = "btn btn-sm action-btn btn-secondary";
      actionbtn = `Unfollow ${author}`;
    } else {
      active = "btn btn-sm action-btn btn-outline-secondary";
      actionbtn = `Follow ${author}`;
    }

    return (
      <app-follow-button>
        <button className={active} onClick={() => this.toggleLike()}>
          <i className="ion-plus-round"></i> &nbsp; {actionbtn}
        </button>
      </app-follow-button>
    );
  }
}

export default FollowButton;
