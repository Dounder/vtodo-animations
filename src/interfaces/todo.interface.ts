export interface TodoState {
  todos: Todo[];
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export interface CreateTodoResponse {
  msg: string;
  statusCode: number;
  todo: Todo;
}

export interface TodoResponse {
  total: number;
  todos: Todo[];
}
