import {v1} from 'uuid';
import {resultStatus, todolistAPI, TodolistType} from '../../../api/todolist-api';
import {AppThunk} from '../../../app/store';
import {RequestStatusType, setAppStatusAC} from '../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTitleType = ReturnType<typeof changeTodolistTitleAC>
export type FilterTodolistType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistType = ReturnType<typeof setTodolistAC>
export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>

export type TodolistActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTitleType
    | FilterTodolistType
    | SetTodolistType
    | ChangeTodolistEntityStatusType

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (todolists = initialState, action: TodolistActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                entityStatus: 'idle',
                addedDate: '',
                order: 0
            },
                ...todolists
            ];
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl);
        case 'SET-TODOLIST': {
            return action.todolists.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: 'idle'
            }));
        }
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return todolists.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl);
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
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, status} as const;
};

export const setTodolistAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLIST', todolists} as const;
};
export const getTodolistsTC = (): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.getTodolist()
        .then(res => {
            dispatch(setTodolistAC(res.data));
            dispatch(setAppStatusAC('succeeded'));
        })
};
export const deleteTodolistTC = (todolistId: string): AppThunk => {
    return (dispatch) => {
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'));
        dispatch(setAppStatusAC('loading'));
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                if (res.data.resultCode === resultStatus.OK) {
                    dispatch(removeTodolistAC(todolistId));
                    dispatch(changeTodolistEntityStatusAC(todolistId, 'succeeded'));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
            });
    };
};
export const addTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === resultStatus.OK) {
                    dispatch(addTodolistAC(title));
                    dispatch(setAppStatusAC('succeeded'));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((e) => {
                handleServerNetworkError(e, dispatch);
            });
    };
};
export const updateTodolistTC = (todolistId: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'));
        todolistAPI.updateTodolist(todolistId, title)
            .then(() => {
                dispatch(changeTodolistTitleAC(todolistId, title));
                dispatch(setAppStatusAC('succeeded'));
            });
    };
};
