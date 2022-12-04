import React, {useEffect, useState} from 'react';
import {taskAPI} from '../api/task-api';

export default {
    title: 'API-tasks'
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = '978d2efc-3475-40a5-81b5-2663f1257f31';

        taskAPI.getTask(todolistId)
                .then(res => setState(res.data.items));

    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = '978d2efc-3475-40a5-81b5-2663f1257f31';

        taskAPI.createTask(todolistId, 'new-title')
                .then(res => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
    const todolistId = '978d2efc-3475-40a5-81b5-2663f1257f31';
    const taskId = 'ee941bff-5387-4379-8f24-e00e8a4f71b7';

    const [state, setState] = useState<any>(null);
    useEffect(() => {
        taskAPI.deleteTask(todolistId, taskId)
                .then(res => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTaskTitle = () => {
    const todolistId = '978d2efc-3475-40a5-81b5-2663f1257f31';
    const taskId = 'ee941bff-5387-4379-8f24-e00e8a4f71b7';

    const [state, setState] = useState<any>(null);
    useEffect(() => {
        taskAPI.updateTask(todolistId, taskId, 'check')
                .then(res => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};