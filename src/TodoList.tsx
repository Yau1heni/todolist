import React, {useCallback, useEffect} from 'react';
import AddItemForm from './Components/AddItemForm/AddItemForm';
import EditableSpan from './Components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Task from './Task';
import {TaskStatuses, TaskType} from './api/task-api';
import {FilterValuesType} from './state/todolists-reducer';
import {useAppDispatch} from './customHooks/hooks';
import {getTasksTC} from './state/tasks-reducer';
import {RequestStatusType} from './state/app-reducer';


type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    entityStatus: RequestStatusType
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, status: TaskStatuses, taskId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

const Todolist: React.FC<TodoListPropsType> = React.memo(({
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
    }, [dispatch]);

    const addTaskCallback = useCallback((title: string) => {
        addTask(todolistId, title);
    }, [todolistId, addTask]);

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    };
    const changeTodolistTitleCallback = (title: string) => {
        changeTodolistTitle(todolistId, title);
    };

    const onAllClickHandler = useCallback(() => changeFilter(todolistId, 'all'), [changeFilter, todolistId]);
    const onActiveClickHandler = useCallback(() => changeFilter(todolistId, 'active'), [changeFilter, todolistId]);
    const onCompletedClickHandler = useCallback(() => changeFilter(todolistId, 'completed'), [changeFilter, todolistId]);

    if (filter === 'active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const tasksList = tasks && tasks.length
        ? tasks.map(t => <Task
            task={t}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
            removeTask={removeTask}
            todolistId={todolistId}
            key={t.id}
        />)
        : <span>Your task list is empty!</span>;

    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodolistTitleCallback}/>
                <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback} disabled = {entityStatus==='loading'}/>
            <div>
                {tasksList}
            </div>
            <div>
                <Button
                    onClick={onAllClickHandler}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    color="secondary"
                > All
                </Button>
                <Button
                    onClick={onActiveClickHandler}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    color="error"
                > Active
                </Button>
                <Button
                    onClick={onCompletedClickHandler}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    color="success"
                > Completed
                </Button>
            </div>
        </div>
    );
});

export default Todolist;