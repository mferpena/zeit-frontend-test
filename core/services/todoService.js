import {
  createTodo,
  listTodos,
  updateTodo,
  deleteTodo,
  findTodoById,
} from "../repositories/todoRepository";

export const addTodo = async (title, description) => {
  return await createTodo(title, description);
};

export const getTodos = async () => {
  return await listTodos();
};

export const modifyTodo = async (id, title, description) => {
  return await updateTodo(id, title, description);
};

export const removeTodo = async (id) => {
  return await deleteTodo(id);
};

export const findTodo = async (id) => {
  return await findTodoById(id);
};
