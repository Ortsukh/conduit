import React from "react";

import "./todo-list-item.css";

class TodoListItem extends React.Component {
  render() {
    const {
      label,
      onDelete,
      done,
      important,
      onToggle,
      onImportant
    } = this.props;

    const style = {
      color: important ? "steelblue" : "black",
      fontWeight: important ? "bold" : "normal"
    };

    let classNames = "todo-list-item";

    if (done) {
      classNames += " done";
    }
    if (important) {
      classNames += " important";
    }
    return (
      <span className={classNames}>
        <span className="todo-list-item-label" style={style} onClick={onToggle}>
          {label}
        </span>

        <button type="button" className="importantbtn" onClick={onImportant}>
          <i className="fa fa-exclamation" />
        </button>
        <button type="button" className="deletebtn" onClick={onDelete}>
          <i className="far fa-trash-alt" />
        </button>
      </span>
    );
  }
}

export default TodoListItem;
