import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";

export type filterValuesType = 'All' | 'Active' | 'Completed'

function App() {
    const todoListTitle = "What to learn"
    const [tasks, setTasks] = useState<Array<TaskType>>(
        [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Git', isDone: true},
        ]
    )

    const [filter, setFilter] = useState<filterValuesType>('All')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((t) => t.id !== taskId))
    }
    const changeFilter = (filter: filterValuesType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks([...tasks, newTask])
    }
    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        const updateTask: Array<TaskType> = tasks
            .map(t => t.id === taskId ? {...t, isDone} : t)
        setTasks(updateTask)
    }
    const getFilterTask = (tasks: Array<TaskType>, filter: filterValuesType) => {
        let tasksForTodolist = tasks
        if (filter === 'Active') {
            tasksForTodolist = tasks.filter(t => t.isDone)
        }
        if (filter === 'Completed') {
            tasksForTodolist = tasks.filter(t => !t.isDone)
        }
        return tasksForTodolist
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      filter={filter}
                      tasks={getFilterTask(tasks, filter)}
                      removeTask={removeTask}
                      changeTaskStatus={changeTaskStatus}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
