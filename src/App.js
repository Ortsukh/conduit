import React from "react";
import AppTitle from "./components/AppTitle";
import AppSearch from "./components/AppSearch";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div>
      <AppTitle />
      <AppSearch />
      <TodoList />
    </div>
  );
}

export default App;
