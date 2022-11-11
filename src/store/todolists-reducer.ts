import {filterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

type RemoveType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
type AddType = {
    type: 'ADD-TODOLIST'
    title: string,
}
type ChangeTitleType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
type FilterTodolistType = {
    type: 'CHANGE-TODOLIST-FILTER',
    filter: filterValuesType
    todolistId: string
}

export type ActionType = RemoveType | AddType | ChangeTitleType | FilterTodolistType

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.todolistId)
        case 'ADD-TODOLIST':
            let newTodolistId = v1()
            let newTodolist: TodolistType = {id: newTodolistId, title: action.title, filter: 'All'}
            return [...todolists, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
        //throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveType => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}
export const AddTodolistAC = (title: string): AddType => {
    return {type: 'ADD-TODOLIST', title}
}
export const ChangeTodolistAC = (todolistId: string, title: string): ChangeTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title}
}
export const ChangeFilterTodolistAC = (todolistId: string, filter:filterValuesType): FilterTodolistType => {
    return {type: 'CHANGE-TODOLIST-FILTER', todolistId, filter}
}
