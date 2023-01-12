import { setAppIsInitializedAC, setAppStatusAC } from "../../app/app-reducer";
import { authApi, AuthUserType } from "../../api/auth-api";
import { AppThunk } from "../../app/store";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";
import { resultStatus } from "../../api/todolist-api";

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
  switch (action.type) {
    case "login/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (value: boolean) => ({ type: "login/SET-IS-LOGGED-IN", value } as const);

// thunks
export const loginTC =
  (data: AuthUserType): AppThunk =>
  (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    authApi
      .login(data)
      .then((res) => {
        if (res.data.resultCode === resultStatus.OK) {
          dispatch(setIsLoggedInAC(true));
          dispatch(setAppStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch);
      });
  };

export const meTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === resultStatus.OK) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    })
    .finally(() => dispatch(setAppIsInitializedAC(true)));
};

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(setAppStatusAC("loading"));
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

// types
export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>;
