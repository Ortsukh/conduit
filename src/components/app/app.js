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
      hidden: false,
      id: this.maxId++
    };
  }

  state = {
    todoData: [
      this.createTodo("Drink Coffee"),
      this.createTodo("Make Awesome App")
    ]
  };
  filterActive = () => {
    this.setState(prevState => {
      const nextState = prevState.todoData.map(item => {
        if (item.hidden) {
          item.hidden = false;
        }
        if (item.done) {
          item.hidden = true;
        }

        return item;
      });

      return {
        todoData: nextState
      };
    });
  };
  filterAll = () => {
    this.setState(prevState => {
      const nextState = prevState.todoData.map(item => {
        if (item.hidden) {
          item.hidden = false;
        }
        return item;
      });
      return {
        todoData: nextState
      };
    });
  };
  filterDone = () => {
    this.setState(prevState => {
      const nextState = prevState.todoData.map(item => {
        if (item.hidden) {
          item.hidden = false;
        }
        if (!item.done) {
          item.hidden = true;
        }
        return item;
      });
      return {
        todoData: nextState
      };
    });
  };
  searh = e => {
    const value = e.target.value;
    this.setState(prevState => {
      const nextState = prevState.todoData.map(item => {
        const label = item.label.toLowerCase();
        if (!label.includes(value)) {
          item.hidden = true;
        } else {
          item.hidden = false;
        }
        return item;
      });
      return {
        todoData: nextState
      };
    });
  };
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
          <SearchPanel onSearch={this.searh} />
          <ItemStatusFilter
            onfilterActive={this.filterActive}
            onfilterAll={this.filterAll}
            onfilterDone={this.filterDone}
            todos={todoData}
          />
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
