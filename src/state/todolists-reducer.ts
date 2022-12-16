import {v1} from 'uuid';
import {todolistAPI, TodolistType} from '../api/todolist-api';
import {Dispatch} from 'redux';

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTitleType = ReturnType<typeof changeTodolistTitleAC>
export type FilterTodolistType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistType = ReturnType<typeof setTodolistAC>

export type TodolistActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleType
    | FilterTodolistType
    | SetTodolistType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (todolists = initialState, action: TodolistActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [...todolists,
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all',
                    addedDate: '',
                    order: 0
                }];
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'SET-TODOLIST': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all'
            }));
        }
        default:
            return todolists;
    }
};

export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const;
};
export const addTodolistAC = (title: string) => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const;
};
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const;
};
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const;
};

export const setTodolistAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLIST', todolists} as const;
};

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolist()
        .then((res) => {
            dispatch(setTodolistAC(res.data));
        });
};
