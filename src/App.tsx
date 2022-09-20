import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";

export type filterValuesType = 'All' | 'Active' | 'Completed'

function App() {
    //BLL
    const todoListTitle = "What to learn"

    const [tasks, setType] = useState<Array<TaskType>>(
        [
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'React', isDone: false},
            {id: 4, title: 'Git', isDone: true},
        ]
    )
    const [filter, setFilter] = useState<filterValuesType>('All')

    const removeTask = (taskId: number) => {
        setType(tasks.filter((t) => t.id !== taskId))
    }

    let tasksForTodolist = tasks
    if (filter === 'Active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true)
    }
    
    const changeFilter = (filter: filterValuesType) => {
      setFilter(filter)
    }

    //GUI
    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
