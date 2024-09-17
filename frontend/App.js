import React, { useState, useEffect } from 'react';
import { login, getTodos, createTodo } from './api';

function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            setToken(data.access_token);
            console.log("Logged in!");
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const fetchTodos = async () => {
        if (!token) return;
        try {
            const todos = await getTodos(token);
            setTodos(todos);
        } catch (error) {
            console.error("Failed to fetch todos", error);
        }
    };

    const handleCreateTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        try {
            await createTodo(newTodo, token);
            setNewTodo('');
            fetchTodos();
        } catch (error) {
            console.error("Failed to create todo", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchTodos();
        }
    }, [token]);

    return (
        <div className="App">
            {!token ? (
                <form onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            ) : (
                <div>
                    <h2>Your Todos</h2>
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id}>
                                {todo.title} {todo.completed ? "✅" : "❌"}
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleCreateTodo}>
                        <input
                            type="text"
                            placeholder="New todo"
                            value={newTodo}
                            onChange={(e) => setNewTodo(e.target.value)}
                        />
                        <button type="submit">Add Todo</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default App;
