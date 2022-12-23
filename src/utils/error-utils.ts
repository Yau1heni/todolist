import { Dispatch } from 'redux'
import {AppReducerType, setAppErrorAC, setAppStatusAC} from '../state/app-reducer';
import {ResponseType} from '../api/todolist-api';


// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<AppReducerType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<AppReducerType>) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}
