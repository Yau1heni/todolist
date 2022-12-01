import {FilterValuesType, TodolistType} from '../AppWithRedux';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
type ChangeTitleType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type FilterTodolistType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

export type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTitleType | FilterTodolistType

const initialState: Array<TodolistType> = [];

export const todolistsReducer = (todolists = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            debugger
            return [...todolists, {id: action.todolistId, title: action.title, filter: 'all'}];
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        default:
            return todolists;
    }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const;
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const;
};
export const changeTodolistTitleAC = (id: string, title: string): ChangeTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const;
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): FilterTodolistType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const;
};


