import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {filterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

type TodoListPropsType = {
    todolistId: string
    title: string
    filter: filterValuesType
    tasks: Array<TaskType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: filterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    const getTasksListItem = (t: TaskType) => {
        const removeTasks = () => props.removeTask(props.todolistId, t.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistId, t.id, e.currentTarget.checked)
        }
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(props.todolistId, t.id, title)
        }
        return (
            <li key={t.id} className={t.isDone ? 'isDone' : 'notIsDone'}>
                <input onChange={changeTaskStatus} type="checkbox" checked={t.isDone}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTasks}>x</button>
            </li>
        )
    }
    const tasksList = props.tasks.length
        ? props.tasks.map(getTasksListItem)
        : <span>Your task list is empty!</span>

    const addTask = (title: string) => {
        props.addTask(props.todolistId, title)
    }

    const handlerCreator = (filter: filterValuesType) => () => props.changeFilter(props.todolistId, filter)
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
                <button onClick={removeTodolistHandler}>x
                </button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    onClick={handlerCreator('All')}
                    className={props.filter === 'All' ? 'active-btn btn' : 'btn'}>
                    All
                </button>
                <button
                    onClick={handlerCreator('Active')}
                    className={props.filter === 'Active' ? 'active-btn btn' : 'btn'}>
                    Active
                </button>
                <button
                    onClick={handlerCreator('Completed')}
                    className={props.filter === 'Completed' ? 'active-btn btn' : 'btn'}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;