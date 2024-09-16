const API_URL = 'http://localhost:8000';

export async function login(email, password) {
  const response = await fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username: email, password }),
  });

  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  return data.access_token;
}

export async function createTodo(token, title) {
  const response = await fetch(`${API_URL}/todos/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  if (!response.ok) throw new Error('Create todo failed');
  return response.json();
}

export async function getTodos(token) {
  const response = await fetch(`${API_URL}/todos/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Fetch todos failed');
  return response.json();
}

export async function updateTodo(token, id, completed) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ completed }),
  });

  if (!response.ok) throw new Error('Update todo failed');
  return response.json();
}

export async function deleteTodo(token, id) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Delete todo failed');
  return response.json();
}
