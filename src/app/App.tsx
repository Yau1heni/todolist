import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import ButtonAppBar from '../ButtonAppBar';
import {TaskType} from '../api/task-api';
import {useAppSelector} from '../customHooks/hooks';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {RequestStatusType} from './app-reducer';
import TodolistLists from '../features/TodolistsList/TodolistLists';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const App = () => {
    const status = useAppSelector<RequestStatusType>(state => state.app.status);

    return (
        <div className="App">
            <ButtonAppBar/>
            <ErrorSnackbar/>
            {status === 'loading' && <LinearProgress color="secondary"/>}
            <Container fixed>
                <TodolistLists/>
            </Container>
        </div>
    );
};




export default App;
