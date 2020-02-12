import React, { Component } from "react";

import "./search-panel.css";

class SearchPanel extends Component {
  render() {
    const { onSearch } = this.props;
    return (
      <input
        type="text"
        className="search-input"
        placeholder="type to search"
        onChange={onSearch}
      />
    );
  }
}
export default SearchPanel;
