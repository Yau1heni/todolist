import {tasksReducer} from '../features/TodolistsList/Todolist/Task/tasks-reducer';
import {todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer';
import {appReducer} from './app-reducer';
import {authReducer} from '../features/Login/auth-reduser';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer,
        login: authReducer
    },
});

export type AppRootStateType = ReturnType<typeof store.getState>

