import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton'
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
    addTask: (todolistId: string, title: string) => void
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

const Todolist = (props: TodoListPropsType) => {
    const getTasksListItem = (t: TaskType) => {
        const removeTasks = () => props.removeTask(props.todolistId, t.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistId, e.currentTarget.checked, t.id)
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(props.todolistId, t.id, title)
        }
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
        )
    }
    const tasksList = props.tasks.length
        ? props.tasks.map(getTasksListItem)
        : <span>Your task list is empty!</span>

    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const handlerCreator = (filter: FilterValuesType) => () => props.changeFilter(props.todolistId, filter)
    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistId)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }

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
                    onClick={handlerCreator('all')}
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    color="secondary"
                > +
                </Button>
                <Button
                    onClick={handlerCreator('active')}
                    variant={props.filter === 'active' ? 'contained' : 'outlined'}
                    color="success"
                > +
                </Button>
                <Button
                    onClick={handlerCreator('completed')}
                    variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                    color="error"
                > +
                </Button>
            </div>
        </div>
    );
};

export default Todolist;