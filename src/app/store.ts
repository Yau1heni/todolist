import {tasksSlice} from '../features/TodolistsList/Todolist/Task/tasks-slice';
import {todolistsSlice} from '../features/TodolistsList/Todolist/todolists-slice';
import {appSlice} from './app-slice';
import {authSlice} from '../features/Login/auth-slice';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    todolists: todolistsSlice,
    app: appSlice,
    login: authSlice
  }
});

export type AppRootStateType = ReturnType<typeof store.getState>

