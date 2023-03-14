import {Dispatch} from 'redux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {setIsLoggedInAC} from '../features/Login/auth-reduser';
import {authApi} from '../api/auth-api';

const initialState: InitialStateType = {
  status: 'idle',
  error: null,
  isInitialized: false
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value;
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
      state.error = action.payload.error;
    },
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status;
    }
  }
});

export const appReducer = slice.reducer;
export const {setAppInitializedAC, setAppErrorAC, setAppStatusAC} = slice.actions;

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
  status: RequestStatusType
  error: string | null
  isInitialized: boolean
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
  authApi.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({value: true}));
    }
    dispatch(setAppInitializedAC({value: true}));
  });
};

