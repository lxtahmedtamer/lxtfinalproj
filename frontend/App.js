import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (email, password) => {
    const fakeUser = { id: 1, email: email, token: 'fake-jwt-token' };
    setUser(fakeUser);
  };

  const fetchTodos = async () => {
    if (!user) return;
    const fakeTodos = [{ id: 1, title: 'Build a ToDo App', completed: false }];
    setTodos(fakeTodos);
  };

  const addTodo = (title) => {
    const todo = { id: todos.length + 1, title, completed: false };
    setTodos([...todos, todo]);
  };

  const updateTodo = (todo) => {
    const updatedTodos = todos.map(t => (t.id === todo.id ? { ...t, completed: !t.completed } : t));
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleAddTodo = (title) => {
    addTodo(title);
  };

  useEffect(() => {
    fetchTodos();
  }, [user]);

  if (!user) {
    return (
      <div className="container">
        <h2 className="title">Login</h2>
        <form className="form" onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="input"
          />
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="title">Welcome, {user.email}</h2>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onUpdateTodo={updateTodo} onDeleteTodo={deleteTodo} />
    </div>
  );
};

export default App;
