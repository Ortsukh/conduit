import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const todos = [
    { id: 1, title: "asasas" },
    { id: 2, title: "asasasaaa" }
  ];
  return (
    <ul>
      {todos.map(item => (
        <TodoItem title={item.title} key={item.id} />
      ))}
    </ul>
  );
}
