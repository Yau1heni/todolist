import React, {useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import AddItemForm from './AddItemForm';
import EditableSpan from './EditableSpan';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Task from './Task';


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

const Todolist: React.FC<TodoListPropsType> = React.memo(({
                                                              todolistId,
                                                              title,
                                                              filter,
                                                              tasks,
                                                              removeTask,
                                                              changeFilter,
                                                              addTask,
                                                              changeTaskStatus,
                                                              removeTodolist,
                                                              changeTaskTitle,
                                                              changeTodolistTitle,
                                                          }) => {

    if (filter === 'active') {
        tasks = tasks.filter(tl => !tl.isDone);
    }
    if (filter === 'completed') {
        tasks = tasks.filter(tl => tl.isDone);
    }

    const tasksList = tasks.length
            ? tasks.map(t => <Task
                    task={t}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    removeTask={removeTask}
                    todolistId={todolistId}
                    key={t.id}
            />)
            : <span>Your task list is empty!</span>;

    const addTaskCallback = useCallback((title: string) => {
        addTask(title, todolistId);
    }, [addTask, todolistId]);

    const removeTodolistHandler = () => {
        removeTodolist(todolistId);
    };
    const changeTodolistTitleCallback = (title: string) => {
        changeTodolistTitle(todolistId, title);
    };

    const onAllClickHandler = useCallback(() => changeFilter(todolistId, 'all'), [changeFilter, todolistId]);
    const onActiveClickHandler = useCallback(() => changeFilter(todolistId, 'active'), [changeFilter, todolistId]);
    const onCompletedClickHandler = useCallback(() => changeFilter(todolistId, 'completed'), [changeFilter, todolistId]);

    return (
            <div>
                <h3>
                    <EditableSpan title={title} changeTitle={changeTodolistTitleCallback}/>
                    <IconButton onClick={removeTodolistHandler}>
                        <Delete/>
                    </IconButton>
                </h3>
                <AddItemForm addItem={addTaskCallback}/>
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