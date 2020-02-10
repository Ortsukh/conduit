import React, { Component } from "react";

import "./add-form.css";

class AddForm extends Component {
  state = {
    label: "123123"
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
          e.preventDefault();
          onAdded(label);
          this.setState({ label: "" });
        }}
      >
        <input
          className="add_form_input"
          onChange={this.onChange}
          value={label}
        />
        <button className="btn_add">Add</button>
      </form>
    );
  }
}

export default AddForm;
