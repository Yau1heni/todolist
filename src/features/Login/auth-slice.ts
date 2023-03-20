import {setAppStatus} from '../../app/app-slice';
import {authApi, AuthUserType} from '../../api/auth-api';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {resultStatus} from '../../api/todolist-api';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
      state.isLoggedIn = action.payload.value;
    }
  }
});

export const authSlice = slice.reducer;
export const {setIsLoggedIn} = slice.actions;


export const loginTC = createAsyncThunk(
  'auth/login',
  async (data: AuthUserType, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
      const res = await authApi.login(data);
      if (res.data.resultCode === resultStatus.OK) {
        dispatch(setIsLoggedIn({value: true}));
        dispatch(setAppStatus({status: 'succeeded'}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
    } finally {
      dispatch(setAppStatus({status: 'idle'}));
    }
  });

export const logoutTC = createAsyncThunk(
  'auth/logout',
  async (_, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
      const res = await authApi.logout();
      if (res.data.resultCode === resultStatus.OK) {
        dispatch(setIsLoggedIn({value: false}));
        dispatch(setAppStatus({status: 'succeeded'}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
    } finally {
      dispatch(setAppStatus({status: 'idle'}));
    }
  });