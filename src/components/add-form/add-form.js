import React, { Component } from "react";

import "./add-form.css";

class AddForm extends Component {
  state = {
    label: ""
  };

  onChange = e => {
    const value = e.target.value;

    this.setState({ label: value });
  };

  render() {
    const { onAdded } = this.props;
    const { label } = this.state;
    return (
      <form
        className="add_form"
        onSubmit={e => {
          if (label) {
            e.preventDefault();
            onAdded(label);
            this.setState({ label: "" });
          }
          e.preventDefault();
        }}
      >
        <input
          className="add_form_input"
          onChange={this.onChange}
          placeholder="Add new"
          value={label}
        />
        <button className="btn_add">Add</button>
      </form>
    );
  }
}

export default AddForm;
