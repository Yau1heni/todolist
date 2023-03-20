import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {resultStatus, todolistAPI, TodolistType} from '../../../api/todolist-api';
import {RequestStatusType, setAppStatus} from '../../../app/app-slice';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';

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

export const todolistsSlice = slice.reducer;
export const {
  removeTodolistAC,
  addTodolistAC,
  changeTodolistTitleAC,
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC,
  setTodolistsAC
} = slice.actions;


export const getTodolistsTC = createAsyncThunk(
  'todo/getTodo',
  async (_, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
      const res = await todolistAPI.getTodolist();
      dispatch(setTodolistsAC({todolists: res.data}));
      dispatch(setAppStatus({status: 'succeeded'}));
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
    } finally {
      dispatch(setAppStatus({status: 'idle'}));
    }
  });

export const deleteTodolistTC = createAsyncThunk(
  'todo/deleteTodo',
  async (todolistId: string, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}));
    dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}));
    try {
      const res = await todolistAPI.deleteTodolist(todolistId);
      if (res.data.resultCode === resultStatus.OK) {
        dispatch(removeTodolistAC({id: todolistId}));
        dispatch(setAppStatus({status: 'succeeded'}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
    }
  });

export const addTodolistTC = createAsyncThunk(
  'todo/addTodo',
  async (title: string, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
      const res = await todolistAPI.createTodolist(title);
      if (res.data.resultCode === resultStatus.OK) {
        dispatch(addTodolistAC({todolist: res.data.data.item}));
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

export const updateTodolistTC = createAsyncThunk(
  'todo/updateTodo',
  async ({todolistId, title}: UpdateTodoPayloadType, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
      await todolistAPI.updateTodolist(todolistId, title);
      dispatch(changeTodolistTitleAC({id: todolistId, title}));
      dispatch(setAppStatus({status: 'succeeded'}));
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
    } finally {
      dispatch(setAppStatus({status: 'idle'}));
    }
  });

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

type UpdateTodoPayloadType = {
  todolistId: string
  title: string
}
