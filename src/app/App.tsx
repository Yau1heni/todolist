import React, {useEffect} from 'react';
import './App.css';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import ButtonAppBar from '../ButtonAppBar';
import {TaskType} from '../api/task-api';
import {useAppDispatch, useAppSelector} from '../customHooks/hooks';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import TodolistLists from '../features/TodolistsList/TodolistLists';
import {Login} from '../features/Login/Login';
import {CircularProgress} from '@mui/material';
import {initializeAppTC} from './app-slice';

export type TasksStateType = {
  [key: string]: Array<TaskType>;
};

const App = () => {
  const status = useAppSelector((s) => s.app.status);
  const isInitialized = useAppSelector((s) => s.app.isInitialized);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
      <ButtonAppBar />
      <ErrorSnackbar />
      {status === "loading" && <LinearProgress color="secondary" />}
      <Container fixed>
        <Routes>
          <Route path="/" element={<TodolistLists />} />
          <Route path="/login" element={<Login />} />

          <Route path="/404" element={<h2>404: PAGE NOT FOUND</h2>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
