export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

const initialState = {
  status: "idle" as RequestStatusType,
  error: null as null | string,
  isInitialized: false,
};

type InitialStateType = typeof initialState;

export const appReducer = (state: InitialStateType = initialState, action: AppReducerType): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS": {
      return { ...state, status: action.status };
    }
    case "APP/ERROR-STATUS": {
      return { ...state, error: action.error };
    }
    case "APP/IS-INITIALIZED": {
      return { ...state, isInitialized: action.isInitialized };
    }
    default:
      return state;
  }
};
export type AppReducerType = SetAppStatus | SetErrorStatus | SetAppIsInitialized;

type SetAppStatus = ReturnType<typeof setAppStatusAC>;
type SetErrorStatus = ReturnType<typeof setAppErrorAC>;
type SetAppIsInitialized = ReturnType<typeof setAppIsInitializedAC>;

export const setAppStatusAC = (status: RequestStatusType) => {
  return { type: "APP/SET-STATUS", status } as const;
};
export const setAppErrorAC = (error: null | string) => {
  return { type: "APP/ERROR-STATUS", error } as const;
};
export const setAppIsInitializedAC = (isInitialized: boolean) => {
  return { type: "APP/IS-INITIALIZED", isInitialized } as const;
};
