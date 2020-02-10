import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import AddForm from "../add-form";

import "./app.css";

class App extends Component {
  maxId = 100;

  createTodo(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  }

  state = {
    todoData: [
      this.createTodo("Drink Coffee"),
      this.createTodo("Make Awesome App")
    ]
  };
  filterActive() {
    this.setState(prevState => {
      return {
        todoData: prevState.todoData.filter(item => item.done === true)
      };
    });
  }
  deleteItem = id => {
    this.setState(prevState => {
      return {
        todoData: prevState.todoData.filter(item => item.id !== id)
      };
    });
  };

  toggleImportant = id => {
    this.setState(prevState => {
      const nextState = prevState.todoData.map(item => {
        if (item.id === id) {
          item.important = !item.important;
        }
        return item;
      });
      return {
        todoData: nextState
      };
    });
  };
  toggleDone = id => {
    this.setState(prevState => {
      const nextState = prevState.todoData.map(item => {
        if (item.id === id) {
          item.done = !item.done;
        }
        return item;
      });
      return {
        todoData: nextState
      };
    });
  };

  addTodo = label => {
    this.setState(prevState => {
      return {
        todoData: prevState.todoData.concat(this.createTodo(label))
      };
    });
  };

  render() {
    const { todoData } = this.state;
    const todo = todoData.filter(item => !item.done).length;
    const done = todoData.length - todo;

    return (
      <div className="todo-app">
        <AppHeader toDo={todo} done={done} />
        <div className="top-panel search-panel">
          <SearchPanel />
          <ItemStatusFilter onfilterActive={this.filterActive} />
        </div>

        <TodoList
          todos={todoData}
          onDelete={this.deleteItem}
          onToggle={this.toggleDone}
          onImportant={this.toggleImportant}
        />
        <AddForm onAdded={this.addTodo} />
      </div>
    );
  }
}

export default App;
