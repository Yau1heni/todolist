import {Dispatch} from 'redux';
import {setAppErrorAC, setAppStatus} from '../app/app-slice';
import {ResponseType} from '../api/todolist-api';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppErrorAC({error: data.messages[0]}));
  } else {
    dispatch(setAppErrorAC({error: 'Some error occurred'}));
  }
  dispatch(setAppStatus({status: 'failed'}));
};

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppErrorAC({error: error.message}));
  dispatch(setAppStatus({status: 'failed'}));
};
