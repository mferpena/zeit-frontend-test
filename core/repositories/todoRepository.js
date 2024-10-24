import axios from "axios";

const BASE_URL = 'https://demo6806380.mockable.io';

export const createTodo = async (title, description) => {
  const response = await axios.post(`${BASE_URL}/todo-create`, {
    title,
    description,
  });
  return response.data;
};

export const listTodos = async () => {
  const response = await axios.get(`${BASE_URL}/todo-list`);
  return response.data;
};

export const updateTodo = async (id, title, description) => {
  const response = await axios.put(`${BASE_URL}/todo-update`, {
    id,
    title,
    description
  });
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await axios.delete(`${BASE_URL}/todo-delete/${id}`);
  return response.data;
};

export const findTodoById = async (id) => {
  const response = await axios.get(`${BASE_URL}/todo/${id}`);
  return response.data;
};
