import { createSlice } from '@reduxjs/toolkit';
import type { TodoState } from "./types.ts";

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
  reducers: {},
});

export const todoReducer = todoSlice.reducer;