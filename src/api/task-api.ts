import {ResponseType} from './todolist-api';
import axios from 'axios';

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses,
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    items: TaskType[]
    error: null | string
    totalCount: number
}
type TaskResponseType = {
    data: {
        item: TaskType
    }
    error: null | string
    totalCount: number
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '5e83c86a-1713-4894-b55e-b49e5d20fde8'
    }
});

export const taskAPI = {
    getTask(todolistId: string) {
        return instance.get<GetTasksResponse>(`${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<TaskResponseType>(`${todolistId}/tasks`, {title: title});
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<TaskResponseType>(`${todolistId}/tasks/${taskId}`, model);
    }
};
