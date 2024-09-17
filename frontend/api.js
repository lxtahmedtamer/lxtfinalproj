import axios from 'axios';

const API_URL = "http://127.0.0.1:8000";

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/token`, {
        username: email,
        password: password
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    return response.data;
};

export const getTodos = async (token) => {
    const response = await axios.get(`${API_URL}/todos/`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};

export const createTodo = async (title, token) => {
    const response = await axios.post(`${API_URL}/todos/`, { title }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
};
