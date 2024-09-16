import React from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => (
  <li className="todo-item">
    <span
      className={todo.completed ? 'completed' : ''}
      onClick={() => onUpdate(todo)}
    >
      {todo.title}
    </span>
    <button onClick={() => onDelete(todo.id)} className="delete-button">
      Delete
    </button>
  </li>
);

export default TodoItem;
