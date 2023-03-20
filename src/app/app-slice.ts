import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setIsLoggedIn} from '../features/Login/auth-slice';
import {authApi} from '../api/auth-api';
import {handleServerNetworkError} from '../utils/error-utils';

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppInitialized(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value;
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    }
  }
});

export const appSlice = slice.reducer;
export const {setAppInitialized, setAppErrorAC, setAppStatus} = slice.actions;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}

export const initializeAppTC = createAsyncThunk('app/initialized', async (arg, {dispatch}) => {
  dispatch(setAppStatus({status: 'loading'}));
  try {
    const res = await authApi.me();
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedIn({value: true}));
    }
    dispatch(setAppInitialized({value: true}));
  } catch (e: any) {
    handleServerNetworkError(e, dispatch);
  } finally {
    dispatch(setAppStatus({status: 'idle'}));
  }
});