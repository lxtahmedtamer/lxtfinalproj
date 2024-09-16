import React from 'react';

const TodoList = ({ todos, onUpdateTodo, onDeleteTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <span
            className={todo.completed ? 'completed' : ''}
            onClick={() => onUpdateTodo(todo)}
          >
            {todo.title}
          </span>
          <button onClick={() => onDeleteTodo(todo.id)} className="delete-button">
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
