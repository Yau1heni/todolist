import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
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
    todolistId: string
}

export type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTitleType | FilterTodolistType

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            return [...todolists, {id: action.todolistId, title: action.title, filter: 'All'}]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}
export const addTodolistAC = (title: string, todolistId: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}
export const changeTodolistAC = (todolistId: string, title: string): ChangeTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title}
}
export const changeFilterTodolistAC = (todolistId: string, filter:FilterValuesType): FilterTodolistType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter}
}
