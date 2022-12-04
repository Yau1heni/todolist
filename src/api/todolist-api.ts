import axios from 'axios';

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5e83c86a-1713-4894-b55e-b49e5d20fde8'
    },
});

export const todolistAPI = {
    getTodolist() {
        return instance.get<Array<TodolistType>>('todo-lists');
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>
        ('todo-lists', {title: title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title: title});
    }
};
