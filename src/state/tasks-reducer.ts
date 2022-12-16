import {TasksStateType} from '../App';
import {taskAPI, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from '../api/task-api';
import {AppRootStateType, AppThunk} from './store';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistType} from './todolists-reducer';

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

type AddTaskActionType = ReturnType<typeof addTaskAC>
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
type SetTaskSActionType = ReturnType<typeof setTasksAC>

export type TasksActionsType = | AddTaskActionType
    | RemoveTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | SetTaskSActionType
    | RemoveTodolistActionType
    | SetTodolistType

const initialState: TasksStateType = {};

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASKS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .filter(t => t.id !== action.taskId)
            };
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
            };
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            };
        case 'ADD-TODOLIST':
            return {
                ...state, [action.todolistId]: []
            };
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        case 'SET-TODOLIST': {
            const copyState = {...state};
            action.todolists.forEach((tl) => {
                copyState[tl.id] = [];
            });
            return copyState;
        }
        case 'SET-TASKS': {
            return {
                ...state, [action.todolistId]: action.tasks
            };
        }
        default:
            return state;
    }
};

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {type: 'SET-TASKS', todolistId, tasks} as const;
};
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const;
};
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {type: 'REMOVE-TASKS', todolistId, taskId} as const;
};
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {type: 'UPDATE-TASK', todolistId, model, taskId} as const;
};

export const getTasksTC = (todolistId: string): AppThunk => (dispatch) => {
    taskAPI.getTask(todolistId).then((res) => {
        dispatch(setTasksAC(todolistId, res.data.items));
    });
};
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
    taskAPI.deleteTask(todolistId, taskId).then(() => {
        dispatch(removeTaskAC(todolistId, taskId));
    });
};
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
    taskAPI.createTask(todolistId, title).then((res) => {
        dispatch(addTaskAC(res.data.data.item));
    });
};
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {
    return (dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId]
            .find(t => t.id = taskId);
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
            taskAPI.updateTask(todolistId, taskId, apiModel)
                .then(() => {
                    dispatch(updateTaskAC(todolistId, taskId, domainModel));
                });
        }

    };
};
