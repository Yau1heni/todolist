import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {resultStatus, todolistAPI, TodolistType} from '../../../api/todolist-api';
import {RequestStatusType, setAppStatusAC} from '../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';
import {Dispatch} from 'redux';

const initialState: Array<TodolistDomainType> = [];

export const slice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      state.splice(index, 1);
    },
    addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
    },
    changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      state[index].title = action.payload.title;
    },
    changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id);
      state[index].entityStatus = action.payload.status;
    },
    setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
      return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
    }
  }
});

export const todolistsReducer = slice.reducer;
export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  setTodolistsAC
} = slice.actions;


export const getTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({status: 'loading'}));
  todolistAPI.getTodolist().then((res) => {
    dispatch(setTodolistsAC({todolists: res.data}))
    dispatch(setAppStatusAC({status: 'succeeded'}));
  });
};
export const deleteTodolistTC = (todolistId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}));
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === resultStatus.OK) {
          dispatch(removeTodolistAC({id: todolistId}));
          dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'succeeded'}));
          dispatch(setAppStatusAC({status: 'succeeded'}));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch);
      });
  };
};
export const addTodolistTC = (title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistAPI
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === resultStatus.OK) {
          dispatch(addTodolistAC({todolist: res.data.data.item}));
          dispatch(setAppStatusAC({status: 'succeeded'}));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e, dispatch);
      });
  };
};
export const updateTodolistTC = (todolistId: string, title: string) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistAPI.updateTodolist(todolistId, title).then(() => {
      dispatch(changeTodolistTitleAC({id: todolistId, title}));
      dispatch(setAppStatusAC({status: 'succeeded'}));
    });
  };
};

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

