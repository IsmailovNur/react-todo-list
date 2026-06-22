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

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      }).addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
      state.isLoading = false;
      state.todos = action.payload;
      }).addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Server error';
      })

      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
      })
  },
});

export const todoReducer = todoSlice.reducer;