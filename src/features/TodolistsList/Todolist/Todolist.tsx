import React, {useCallback, useEffect} from 'react';
import AddItemForm from '../../../components/AddItemForm/AddItemForm';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Task from './Task/Task';
import {TaskStatuses, TaskType} from '../../../api/task-api';
import {FilterValuesType} from './todolists-slice';
import {useAppDispatch} from '../../../customHooks/hooks';
import {getTasksTC} from './Task/tasks-slice';
import {RequestStatusType} from '../../../app/app-slice';

type TodoListPropsType = {
  todolistId: string;
  title: string;
  filter: FilterValuesType;
  tasks: Array<TaskType>;
  entityStatus: RequestStatusType;
  removeTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, filter: FilterValuesType) => void;
  addTask: (todolistId: string, title: string) => void;
  changeTaskStatus: (todolistId: string, status: TaskStatuses, taskId: string) => void;
  removeTodolist: (todolistId: string) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
};

const Todolist: React.FC<TodoListPropsType> = React.memo(
  ({
     todolistId,
     title,
     filter,
     entityStatus,
     tasks,
     removeTask,
     changeFilter,
     addTask,
     changeTaskStatus,
     removeTodolist,
     changeTaskTitle,
     changeTodolistTitle
   }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getTasksTC(todolistId));
    }, []);

    const addTaskCallback = useCallback(
      (title: string) => {
        addTask(todolistId, title);
      },
      [todolistId, addTask]
    );

    const removeTodolistHandler = () => {
      removeTodolist(todolistId);
    };
    const changeTodolistTitleCallback = (title: string) => {
      changeTodolistTitle(todolistId, title);
    };

    const onAllClickHandler = useCallback(() => changeFilter(todolistId, 'all'), [changeFilter, todolistId]);
    const onActiveClickHandler = useCallback(() => changeFilter(todolistId, 'active'), [changeFilter, todolistId]);
    const onCompletedClickHandler = useCallback(
      () => changeFilter(todolistId, 'completed'),
      [changeFilter, todolistId]
    );

    if (filter === 'active') {
      tasks = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
      tasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }

    const tasksList =
      tasks && tasks.length ? (
        tasks.map((t) => (
          <Task
            task={t}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            removeTask={removeTask}
            todolistId={todolistId}
            key={t.id}
          />
        ))
      ) : (
        <span>Your task list is empty!</span>
      );

    return (
      <div>
        <h3>
          <EditableSpan title={title} changeTitle={changeTodolistTitleCallback}/>
          <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
            <Delete/>
          </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback} disabled={entityStatus === 'loading'}/>
        <div>{tasksList}</div>
        <div>
          <Button onClick={onAllClickHandler} variant={filter === 'all' ? 'contained' : 'outlined'} color="secondary">
            All
          </Button>
          <Button onClick={onActiveClickHandler} variant={filter === 'active' ? 'contained' : 'outlined'} color="error">
            Active
          </Button>
          <Button
            onClick={onCompletedClickHandler}
            variant={filter === 'completed' ? 'contained' : 'outlined'}
            color="success"
          >
            Completed
          </Button>
        </div>
      </div>
    );
  }
);

export default Todolist;
