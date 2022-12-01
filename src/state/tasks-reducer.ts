import {TasksStateType} from '../AppWithRedux';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType
        | AddTaskActionType
        | ChangeTaskStatusActionType
        | ChangeTaskTitleActionType
        | AddTodolistActionType
        | RemoveTodolistActionType

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)};
        case 'ADD-TASK':
            let task = {id: v1(), title: action.title, isDone: false};
            return {
                ...state, [action.todolistId]: [task, ...state[action.todolistId]]
            };
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                        .map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)
            };
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                        .map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)
            };
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todolistId]: []
            };
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        default:
            return state;
    }
};

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const;
};
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const;
};
export const changeTaskStatusAC = (todolistId: string, isDone: boolean, taskId: string) => {
    return {type: 'CHANGE-TASK-STATUS', todolistId, isDone, taskId} as const;
};
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId} as const;
};


