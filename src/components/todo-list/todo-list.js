import React from "react";

import TodoListItem from "../todo-list-item/";
import "./todo-list.css";
class TodoList extends React.Component {
  render() {
    const { todos, onDelete, onToggle, onImportant } = this.props;

    const elements = todos.map(item => {
      const { id, hidden, ...itemProps } = item;
      let classNames = "list-group-item";
      if (hidden) {
        classNames += " hidden";
      }
      if (!hidden) {
        classNames.replace(hidden, "");
      }
      return (
        <li key={id} className={classNames}>
          <TodoListItem
            {...itemProps}
            onDelete={() => onDelete(id)}
            onToggle={() => onToggle(id)}
            onImportant={() => onImportant(id)}
          />
        </li>
      );
    });

    return <ul className="list-group todo-list">{elements}</ul>;
  }
}
export default TodoList;
