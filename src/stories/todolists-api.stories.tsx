import React, {useEffect, useState} from 'react';
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.getTodolist()
                .then(res => setState(res.data))

    }, []);
    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.createTodolist('title')
                .then(res => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const todolistId = 'ac4a6964-b11c-424e-aa18-fed962f998d6';
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
                .then(res => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
    const todolistId = 'ac4a6964-b11c-424e-aa18-fed962f998d6';
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'check')
                .then(res => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};