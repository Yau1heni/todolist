import {useAppDispatch, useAppSelector} from '../../customHooks/hooks';
import {
  addTodolistTC,
  changeTodolistFilterAC,
  deleteTodolistTC,
  FilterValuesType,
  getTodolistsTC,
  TodolistDomainType,
  updateTodolistTC
} from './Todolist/todolists-slice';
import React, {useCallback, useEffect} from 'react';
import {addTaskTC, deleteTaskTC, updateTaskTC} from './Todolist/Task/tasks-slice';
import {TaskStatuses} from '../../api/task-api';
import Grid from '@mui/material/Grid';
import AddItemForm from '../../components/AddItemForm/AddItemForm';
import Paper from '@mui/material/Paper';
import Todolist from './Todolist/Todolist';
import {TasksStateType} from '../../app/App';
import {Navigate} from 'react-router-dom';

const TodolistLists = () => {
  const todolists = useAppSelector<TodolistDomainType[]>((state) => state.todolists);
  const tasks = useAppSelector<TasksStateType>((state) => state.tasks);
  const isLoggedIn = useAppSelector((s) => s.login.isLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(getTodolistsTC());
  }, []);

  const removeTask = useCallback(
    (todolistId: string, taskId: string) => {
      dispatch(deleteTaskTC({todolistId, taskId}));
    },
    [dispatch]
  );
  const addTask = useCallback(
    (todolistId: string, title: string) => {
      dispatch(addTaskTC({todolistId, title}));
    },
    [dispatch]
  );
  const changeTaskStatus = useCallback(
    (todolistId: string, status: TaskStatuses, taskId: string) => {
      dispatch(updateTaskTC({todolistId, taskId, domainModel: {status}}));
    },
    [dispatch]
  );
  const changeTaskTitle = useCallback(
    (todolistId: string, taskId: string, title: string) => {
      dispatch(updateTaskTC({todolistId, taskId, domainModel: {title}}));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (todolistId: string, filter: FilterValuesType) => {
      dispatch(changeTodolistFilterAC({id: todolistId, filter}));
    },
    [dispatch]
  );
  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(deleteTodolistTC(todolistId));
    },
    [dispatch]
  );
  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch]
  );
  const changeTodolistTitle = useCallback(
    (todolistId: string, title: string) => {
      dispatch(updateTodolistTC({todolistId, title}));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Navigate to={'/login'}/>;
  }

  return (
    <>
      <Grid container style={{paddingTop: '20px'}}>
        <AddItemForm addItem={addTodolist}/>
      </Grid>

      <Grid container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} item>
              <Paper style={{padding: '10px'}}>
                <Todolist
                  key={tl.id}
                  todolistId={tl.id}
                  title={tl.title}
                  filter={tl.filter}
                  tasks={tasks[tl.id]}
                  entityStatus={tl.entityStatus}
                  removeTask={removeTask}
                  changeTaskStatus={changeTaskStatus}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default TodolistLists;
