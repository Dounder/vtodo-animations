import axios from 'axios';
import { storeToRefs } from 'pinia';
import { api } from 'src/boot/axios';
import { useTodoStore } from 'src/stores/todo-store';
import { ref } from 'vue';

import {
  CreateTodoResponse,
  Todo,
  TodoResponse,
} from './../interfaces/todo.interface';

const useTodo = () => {
  const store = useTodoStore();
  const gettingTodos = ref(false);
  const creatingTodo = ref(false);
  const updatingTodo = ref(false);
  const deletingTodo = ref(false);
  const { todos } = storeToRefs(store);

  const getTodos = async () => {
    try {
      gettingTodos.value = true;
      const { data } = await api.get<TodoResponse>('/todo');
      store.setTodos(data.todos);
      gettingTodos.value = false;
    } catch (error) {
      gettingTodos.value = false;
      if (axios.isAxiosError(error)) return console.log(error.response);
      console.log(error);
    }
  };

  const createTodo = async (text: string) => {
    try {
      creatingTodo.value = true;
      const { data } = await api.post<CreateTodoResponse>('/todo', { text });

      if (data.statusCode !== 201)
        return { ok: false, msg: 'Error when creating todo' };

      store.newTodo(data.todo);
      creatingTodo.value = false;
      return { ok: true, msg: data.msg };
    } catch (error) {
      creatingTodo.value = false;

      if (axios.isAxiosError(error))
        return { ok: false, msg: error.response?.data };

      console.log(error);
      return { ok: false, msg: 'Unexpected error. Contact administrator' };
    }
  };

  const updateTodo = async (todo: Todo) => {
    try {
      const { id, text, completed } = todo;

      updatingTodo.value = true;

      const { data } = await api.patch<CreateTodoResponse>(`/todo/${id}`, {
        text,
        completed,
      });

      store.updateTodo(data.todo);
      updatingTodo.value = false;
      return { ok: true, msg: data.msg };
    } catch (error) {
      updatingTodo.value = false;

      if (axios.isAxiosError(error))
        return { ok: false, msg: error.response?.data.message.join(', ') };

      console.log(error);
      return { ok: false, msg: 'Unexpected error. Contact administrator' };
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      deletingTodo.value = true;

      const { data } = await api.delete<CreateTodoResponse>(`/todo/${id}`);

      store.deleteTodo(id);
      deletingTodo.value = false;
      return { ok: true, msg: data.msg };
    } catch (error) {
      deletingTodo.value = false;

      if (axios.isAxiosError(error))
        return { ok: false, msg: error.response?.data.message };

      console.log(error);
      return { ok: false, msg: 'Unexpected error. Contact administrator' };
    }
  };

  return {
    //? Properties
    todos,
    gettingTodos,
    creatingTodo,
    updatingTodo,

    //! Actions
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};

export default useTodo;
