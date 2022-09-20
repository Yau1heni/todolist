import React from 'react';
import {filterValuesType} from "./App";
//rsc

type TodoListPropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: number) => void
    changeFilter: (filter: filterValuesType) => void
}

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

const TodoList = (props: TodoListPropsType) => {

    const tasksList = props.tasks.map((t) => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button onClick={() =>props.changeFilter('All')}>All</button>
                <button onClick={() =>props.changeFilter('Active')}>Active</button>
                <button onClick={() =>props.changeFilter('Completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;