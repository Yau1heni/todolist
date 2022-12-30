export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
};

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppReducerType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status};
        }
        case 'APP/ERROR-STATUS': {
            return {...state, error: action.error};
        }
        default:
            return state;

    }
};
export type AppReducerType = SetAppStatus | SetErrorStatus

type SetAppStatus = ReturnType<typeof setAppStatusAC>
type SetErrorStatus = ReturnType<typeof setAppErrorAC>

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const;
};
export const setAppErrorAC = (error: null | string) => {
    return {type: 'APP/ERROR-STATUS', error} as const;
};
