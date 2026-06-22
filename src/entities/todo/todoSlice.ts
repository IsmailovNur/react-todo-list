import {
  createAsyncThunk,
  createSlice,
  type PayloadAction
} from '@reduxjs/toolkit';
import type { Todo, TodoState } from "./types.ts";
import { axiosInstance } from "../../shared/api/axiosInstance.ts";

type FirebaseTodosResponse = Record<string, Omit<Todo, 'id'>>;

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const fetchTodos = createAsyncThunk<Todo[], void, {
  rejectValue: string
}>(
  'todo/fetchTodos',
  async (_, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get<FirebaseTodosResponse>('/todos.json');

      if (!response.data) return [];

      return Object.entries(response.data).map(([id, value]) => ({
        id,
        ...value,
      }));
    } catch {
      return rejectWithValue('Failed to load todos');
    }
  }
);

export const addTodo = createAsyncThunk<Todo, string, {
  rejectValue: string
}>(
  'todo/addTodoAsync',
  async (title, {rejectWithValue}) => {
    try {
      const newTodoData = {title, completed: false};
      const response = await axiosInstance.post<{
        name: string
      }>('/todos.json', newTodoData);

      return {
        id: response.data.name,
        ...newTodoData,
      };
    } catch {
      return rejectWithValue('Failed to create todo');
    }
  }
);

export const toggleTodo = createAsyncThunk<Todo, Todo, {
  rejectValue: string
}>(
  'todo/toggleTodoAsync',
  async (todo, {rejectWithValue}) => {
    try {
      await axiosInstance.patch(`/todos/${todo.id}.json`, {
        completed: !todo.completed,
      });

      return {
        ...todo,
        completed: !todo.completed,
      };
    } catch {
      return rejectWithValue('Failed to update todo status');
    }
  }
);

export const deleteTodo = createAsyncThunk<string, string, {
  rejectValue: string
}>(
  'todo/deleteTodoAsync',
  async (id, {rejectWithValue}) => {
    try {
      await axiosInstance.delete(`/todos/${id}.json`);
      return id;
    } catch {
      return rejectWithValue('Failed to delete task from Firebase');
    }
  }
);


const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Server error';
      })

      .addCase(addTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload || 'Failed to add todo';
      })

      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })

      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter(t => t.id !== action.payload);
      });
  },
});

export const todoReducer = todoSlice.reducer;