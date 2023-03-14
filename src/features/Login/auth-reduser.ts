import {setAppInitializedAC, setAppStatusAC} from '../../app/app-reducer';
import {authApi, AuthUserType} from '../../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {resultStatus} from '../../api/todolist-api';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dispatch} from 'redux';

const initialState = {
  isLoggedIn: false
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    }
  }
});

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;

export const loginTC =
  (data: AuthUserType) =>
    (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}));
      authApi
        .login(data)
        .then((res) => {
          if (res.data.resultCode === resultStatus.OK) {
            dispatch(setIsLoggedInAC({value: true}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((e) => {
          handleServerNetworkError(e, dispatch);
        });
    };

export const meTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}));
  authApi
    .me()
    .then((res) => {
      if (res.data.resultCode === resultStatus.OK) {
        dispatch(setIsLoggedInAC({value: true}));
        dispatch(setAppStatusAC({status: 'succeeded'}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((e) => {
      handleServerNetworkError(e, dispatch);
    })
    .finally(() => dispatch(setAppInitializedAC({value: true})));
};

export const logoutTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}));
  authApi
    .logout()
    .then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: false}));
        dispatch(setAppStatusAC({status: 'succeeded'}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export type LoginActionsType = ReturnType<typeof setIsLoggedInAC>;
