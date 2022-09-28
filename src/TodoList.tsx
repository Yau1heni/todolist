import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {filterValuesType} from "./App";
//rsc

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string) => void
    changeFilter: (filter: filterValuesType) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const tasksList = props.tasks.map((t) => {
        const removeTasks = () => props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTasks}>x</button>
            </li>
        )
    })
    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) props.addTask(title)
        setTitle('')
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && addTask()
    const handlerCreator = (filter: filterValuesType) => () => props.changeFilter(filter)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={handlerCreator('All')}>All</button>
                <button onClick={handlerCreator('Active')}>Active</button>
                <button onClick={handlerCreator('Completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;