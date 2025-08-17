import React, { useState } from "react";
import type { Todos } from "./types";
import "./style.css";

const App = () => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");

  // 할 일 추가
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }
    const newTodo = {
      id: Date.now(),
      title,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  // 할 일 체크박스 토글
  const handleCheckboxToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // 할 일 삭제
  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 수정 모드로 전환
  const handleEdit = (id: number) => {
    setEditingId(id);
    const todo = todos.find((todo) => todo.id === id);
    if (todo) setEditTitle(todo.title);
  };

  // 할 일 수정 저장
  const handleSave = (id: number) => {
    if (!editTitle.trim()) {
      alert("할 일을 입력해주세요.");
      return;
    }

    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: editTitle } : todo
      )
    );
    setEditingId(null);
    setEditTitle("");
  };

  // 할 일 수정 취소
  const handleCancel = () => {
    setEditingId(null);
    setEditTitle("");
  };

  return (
    <>
      <h1 className="app-title">My Todo List</h1>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={title}
          placeholder="할 일을 추가하세요."
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  autoFocus
                />
                <button onClick={() => handleSave(todo.id)}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheckboxToggle(todo.id)}
                />
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title}
                </span>
                <button onClick={() => handleEdit(todo.id)}>Edit</button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
