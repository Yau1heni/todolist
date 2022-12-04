import axios from 'axios';
import {ResponseType} from './todolist-api';

type TaskItemsType = {
    id: string
    title: string
    description: string
    todoListId: string
    order: number
    status: number
    priority: number
    startDate: null,
    deadline: null,
    addedDate: string
}
export type TasksType = {
    totalCount: number
    error: string | null
    items: Array<TaskItemsType>
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists/',
    withCredentials: true,
    headers: {
        'API-KEY': '5e83c86a-1713-4894-b55e-b49e5d20fde8'
    },
});

export const taskAPI = {
    getTask(todolistId: string) {
        return instance.get<TasksType>(`${todolistId}/tasks`);
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType>(`${todolistId}/tasks`, {title: title});
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put<ResponseType>(`${todolistId}/tasks/${taskId}`, {title: title});
    }
};
