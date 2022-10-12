import { Todo, TodoState } from './../interfaces/todo.interface';
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: (): TodoState => ({
    todos: [],
  }),
  getters: {},
  actions: {
    setTodos(todos: Todo[]) {
      this.todos = todos;
    },
    newTodo(todo: Todo) {
      this.todos.unshift(todo);
    },
    updateTodo(todo: Todo) {
      this.todos = this.todos.map((t) => (t.id === todo.id ? todo : t));
    },
    deleteTodo(id: string) {
      this.todos = this.todos.filter((t) => t.id !== id);
    },
  },
});
