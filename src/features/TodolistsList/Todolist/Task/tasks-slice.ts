import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from '../todolists-slice';
import {setAppStatus} from '../../../../app/app-slice';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {AppRootStateType} from '../../../../app/store';
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../../../../api/task-api';
import {resultStatus} from '../../../../api/todolist-api';

const initialState: TasksStateType = {};

export const slice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    removeTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string }>) {
      const index = state[action.payload.todolistId].findIndex(t => t.id === action.payload.taskId);
      state[action.payload.todolistId].splice(index, 1);
    },
    addTaskAC(state, action: PayloadAction<TaskType>) {
      state[action.payload.todoListId].unshift(action.payload);
    },
    updateTaskAC(state, action: PayloadAction<{ taskId: string, todolistId: string, model: UpdateDomainTaskModelType }>) {
      const tasks = state[action.payload.todolistId];
      const index = tasks.findIndex(t => t.id === action.payload.taskId);
      tasks[index] = {...tasks[index], ...action.payload.model};
    },
    setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: Array<TaskType> }>) {
      state[action.payload.todolistId] = action.payload.tasks;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addTodolistAC, (state, action) => {
      state[action.payload.todolist.id] = [];
    });
    builder.addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id];
    });
    builder.addCase(setTodolistsAC, (state, action) => {
      action.payload.todolists.forEach(tl => {
        state[tl.id] = [];
      });
    });
  }
});

export const tasksSlice = slice.reducer;
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions;

export const getTasksTC = createAsyncThunk(
  'task/getTasks',
  async (todolistId: string, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
      const res = await taskAPI.getTask(todolistId);
      dispatch(setTasksAC({todolistId: todolistId, tasks: res.data.items}));
      dispatch(setAppStatus({status: 'succeeded'}));
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
    } finally {
      dispatch(setAppStatus({status: 'idle'}));
    }
  });

export const deleteTaskTC = createAsyncThunk(
  'task/deleteTask',
  async ({todolistId, taskId}: DeleteTaskPayloadType, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
      await taskAPI.deleteTask(todolistId, taskId);
      dispatch(removeTaskAC({taskId, todolistId}));
      dispatch(setAppStatus({status: 'succeeded'}));
    } catch (e: any) {
      handleServerNetworkError(e, dispatch);
    }
  });

export const addTaskTC = createAsyncThunk(
  'task/addTask',
  async ({todolistId, title}: AddTaskPayloadType, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}));
    try {
      const res = await taskAPI.createTask(todolistId, title);
      if (res.data.resultCode === resultStatus.OK) {
        dispatch(addTaskAC(res.data.data.item));
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

export const updateTaskTC = createAsyncThunk(
  'task/updateTask',
  async ({todolistId, taskId, domainModel}: UpdatePayloadType, {dispatch, getState}) => {
    const state = getState() as AppRootStateType;
    const task = state.tasks[todolistId].find((t) => t.id === taskId);
    if (task) {
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline,
        startDate: task.startDate,
        ...domainModel
      };
      dispatch(setAppStatus({status: 'loading'}));
      try {
        const res = await taskAPI.updateTask(todolistId, taskId, apiModel);
        if (res.data.resultCode === resultStatus.OK) {
          dispatch(updateTaskAC({taskId, todolistId, model: apiModel}));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      } catch (e: any) {
        handleServerNetworkError(e, dispatch);
      } finally {
        dispatch(setAppStatus({status: 'idle'}));
      }
    }
  });

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type UpdatePayloadType = {
  todolistId: string
  taskId: string
  domainModel: UpdateDomainTaskModelType
}
type AddTaskPayloadType = {
  todolistId: string
  title: string
}
type DeleteTaskPayloadType = {
  todolistId: string
  taskId: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}


