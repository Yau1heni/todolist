import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from '../todolists-reducer';
import {setAppStatusAC} from '../../../../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../../../utils/error-utils';
import {AppRootStateType} from '../../../../app/store';
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../../../../api/task-api';
import {resultStatus} from '../../../../api/todolist-api';
import {Dispatch} from 'redux';

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

export const tasksReducer = slice.reducer;
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = slice.actions;

export const getTasksTC =
  (todolistId: string) =>
    (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}));
      taskAPI.getTask(todolistId).then((res) => {
        dispatch(setTasksAC({todolistId: todolistId, tasks: res.data.items}));
        dispatch(setAppStatusAC({status: 'succeeded'}));
      });
    };
export const removeTaskTC =
  (todolistId: string, taskId: string) =>
    (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}));
      taskAPI.deleteTask(todolistId, taskId).then(() => {
        dispatch(removeTaskAC({taskId, todolistId}));
        dispatch(setAppStatusAC({status: 'succeeded'}));
      });
    };
export const addTaskTC =
  (todolistId: string, title: string) =>
    (dispatch: Dispatch) => {
      dispatch(setAppStatusAC({status: 'loading'}));
      taskAPI
        .createTask(todolistId, title)
        .then((res) => {
          if (res.data.resultCode === resultStatus.OK) {
            dispatch(addTaskAC(res.data.data.item));
            dispatch(setAppStatusAC({status: 'succeeded'}));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((e) => {
          handleServerNetworkError(e, dispatch);
        });
    };
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
  return (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find((t) => t.id === taskId);
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
      taskAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === resultStatus.OK) {
            dispatch(updateTaskAC({taskId, todolistId, model: apiModel}));
          } else {
            handleServerAppError(res.data, dispatch);
          }
        })
        .catch((e) => {
          handleServerNetworkError(e, dispatch);
        });
    }
  };
};

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type TasksStateType = {
  [key: string]: Array<TaskType>
}


