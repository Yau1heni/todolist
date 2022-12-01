import React, {useCallback} from 'react';
import './App.css';
import AddItemForm from './AddItemForm';
import {Container, Grid, Paper} from '@mui/material';
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC,
} from './state/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import ButtonAppBar from './ButtonAppBar';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import Todolist, {TaskType} from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const dispatch = useDispatch();

    const removeTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId));
    }, [dispatch])
    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId));
    }, [dispatch])
    const changeTaskStatus = useCallback((todolistId: string, isDone: boolean, taskId: string) => {
        dispatch(changeTaskStatusAC(todolistId, isDone, taskId));
    }, [dispatch])
    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistId));
    }, [dispatch])

    const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }, [dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }, [dispatch])
    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title));
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch])


    return (
            <div className="App">
                <ButtonAppBar/>
                <Container fixed>
                    <Grid container style={{padding: '20px'}}>
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
}

export default AppWithRedux;
