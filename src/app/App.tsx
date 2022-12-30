import React from 'react';
import './App.css';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import ButtonAppBar from '../ButtonAppBar';
import {TaskType} from '../api/task-api';
import {useAppSelector} from '../customHooks/hooks';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {RequestStatusType} from './app-reducer';
import {Navigate, Route, Routes} from 'react-router-dom';
import TodolistLists from '../features/TodolistsList/TodolistLists';
import {Login} from '../features/Login/Login';

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
                <Routes>
                    <Route path='/' element={<TodolistLists/>}/>
                    <Route path='/login' element={<Login/>}/>

                    <Route path='/404' element={<h2>404: PAGE NOT FOUND</h2>}/>
                    <Route path='*' element={<Navigate to = '/404'/>}/>
                </Routes>
            </Container>
        </div>
    );
};


export default App;
