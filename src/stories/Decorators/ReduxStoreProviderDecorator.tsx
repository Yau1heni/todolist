import {Provider} from 'react-redux';
import React from 'react';
import {combineReducers, legacy_createStore} from 'redux';
import {v1} from 'uuid';
import {AppRootStateType} from '../../app/store';
import {tasksReducer} from '../../features/TodolistsList/Todolist/Task/tasks-reducer';
import {todolistsReducer} from '../../features/TodolistsList/Todolist/todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../../api/task-api';
import {appReducer} from '../../app/app-reducer';


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
});

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', entityStatus: 'idle', order: 0, addedDate: ''},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', entityStatus: 'idle', order: 1, addedDate: ''}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'title1',
                status: TaskStatuses.New,
                todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            }

        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'title2',
                status: TaskStatuses.New,
                todoListId: 'todolistId2', description: '',
                startDate: '', deadline: '', addedDate: '',
                order: 0, priority: TaskPriorities.Low
            }
        ]
    },
    app: {
        status: 'loading',
        error: null
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>);
