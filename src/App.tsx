import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from './AddItemForm';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValuesType,
    getTodolistsTC,
    removeTodolistAC,
    TodolistDomainType
} from './state/todolists-reducer';
import ButtonAppBar from './ButtonAppBar';
import {addTaskTC, removeTaskTC, updateTaskTC} from './state/tasks-reducer';
import Todolist from './Todolist';
import {TaskStatuses, TaskType} from './api/task-api';
import {useAppDispatch, useAppSelector} from './customHooks/hooks';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
    const tasks = useAppSelector<TasksStateType>(state => state.tasks);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodolistsTC());
    }, [dispatch]);

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskTC(todolistId, taskId));
    }, [dispatch]);
    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title));
    }, [dispatch]);
    const changeTaskStatus = useCallback((todolistId: string, status: TaskStatuses, taskId: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}));
    }, [dispatch]);
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}));
    }, [dispatch]);

    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }, [dispatch]);
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }, [dispatch]);
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }, [dispatch]);
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch]);


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{paddingTop: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasks[tl.id]}
                                        removeTask={removeTask}
                                        changeTaskStatus={changeTaskStatus}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>;
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
};

export default App;
