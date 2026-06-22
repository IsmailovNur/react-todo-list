import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Todo, TodoState } from "./types.ts";

const initialState: TodoState = {
  todos: [
    {id: '1', title: 'Walk with dog', completed: false},
    {id: '2', title: 'Wash the car', completed: true},
  ],
  isLoading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    localAddTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
  },
});

export const {localAddTodo} = todoSlice.actions;
export const todoReducer = todoSlice.reducer;