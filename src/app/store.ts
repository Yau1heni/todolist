import {TasksActionsType, tasksReducer} from '../features/TodolistsList/Todolist/Task/tasks-reducer';
import {TodolistActionType, todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer';
import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {appReducer, AppReducerType} from './app-reducer';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer
});
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

type AppActionType = TasksActionsType | TodolistActionType | AppReducerType

export type AppThunk<ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionType>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;