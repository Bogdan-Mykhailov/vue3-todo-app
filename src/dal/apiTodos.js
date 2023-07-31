import {client} from "@/dal/httpClient";
import {userId} from "@/utils/constants";

export const getTodos = () => {
  return client.get(`/todos?userId=${userId}`).then(() => Promise.reject())
};

export const createTodos = (title) => {
  return client.post('/todos', {
    title,
    completed: false,
    userId
  })
};

export const updateTodo = ({ id, title, completed }) => {
  return client.patch(`/todos/${id}`, {
    title,
    completed
  })
}

export const removeTodo = (todoId) => {
  return client.delete(`/todos/${todoId}`);
}
