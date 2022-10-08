import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {filterValuesType} from "./App";

type TodoListPropsType = {
    title: string;
    filter: filterValuesType
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void
    changeFilter: (filter: filterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const getTasksListItem = (t: TaskType) => {
        const removeTasks = () => props.removeTask(t.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id} className={t.isDone ? 'isDone' : 'notIsDone'}>
                <input onChange={changeTaskStatus} type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTasks}>x</button>
            </li>
        )
    }
    const tasksList = props.tasks.length
        ? props.tasks.map(getTasksListItem)
        : <span>Your task list is empty!</span>

    const addTask = () => {
        const trimTitle = title.trim()
        trimTitle !== '' ? props.addTask(trimTitle) : setError(true)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const handlerCreator = (filter: filterValuesType) => () => props.changeFilter(filter)
    const errorMessage = error ? <div style={{color: 'red'}}>Title is required!</div> : null

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
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