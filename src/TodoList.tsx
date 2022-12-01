import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';


type TodoListPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (todolistId: string, isDone: boolean, taskId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const Todolist = React.memo((props: TodoListPropsType) => {

    const getTasksListItem = (t: TaskType) => {
        const removeTasks = () => props.removeTask(props.todolistId, t.id);
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistId, e.currentTarget.checked, t.id);
        };
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(props.todolistId, t.id, title);
        };
        return (
                <li key={t.id} className={t.isDone ? 'isDone' : 'notIsDone'}>
                    <Checkbox
                            onChange={changeTaskStatus}
                            color="primary"
                            checked={t.isDone}
                    />
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                    <IconButton onClick={removeTasks}>
                        <Delete/>
                    </IconButton>
                </li>
        );
    };

    let tasks = props.tasks;
    if (props.filter === 'active') {
        tasks = tasks.filter(tl => !tl.isDone);
    }
    if (props.filter === 'completed') {
        tasks = tasks.filter(tl => tl.isDone);
    }

    const tasksList = tasks.length
            ? tasks.map(getTasksListItem)
            : <span>Your task list is empty!</span>;

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolistId);
    }, [props.addTask, props.todolistId]);

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId);
    };
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title);
    };

    const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'all'), []);
    const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'active'), []);
    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistId, 'completed'), []);

    return (
            <div>
                <h3>
                    <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                    <IconButton onClick={removeTodolistHandler}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTask}/>
                <ul>
                    {tasksList}
                </ul>
                <div>
                    <Button
                            onClick={onAllClickHandler}
                            variant={props.filter === 'all' ? 'contained' : 'outlined'}
                            color="secondary"
                    > All
                    </Button>
                    <Button
                            onClick={onActiveClickHandler}
                            variant={props.filter === 'active' ? 'contained' : 'outlined'}
                            color="error"
                    > Active
                    </Button>
                    <Button
                            onClick={onCompletedClickHandler}
                            variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                            color="success"
                    > Completed
                    </Button>
                </div>
            </div>
    );
});

export default Todolist;