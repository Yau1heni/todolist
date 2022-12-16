import Checkbox from '@mui/material/Checkbox/Checkbox';
import React, {ChangeEvent, useCallback} from 'react';
import EditableSpan from './EditableSpan';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {TaskStatuses, TaskType} from './api/task-api';

type TaskPropsType = {
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}

export const Task: React.FC<TaskPropsType> = React.memo(({
                                                             changeTaskStatus,
                                                             changeTaskTitle,
                                                             removeTask,
                                                             task,
                                                             todolistId
                                                         }) => {

    const onClickHandler = useCallback(() => removeTask(todolistId, task.id), [todolistId, task.id]);
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todolistId, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, task.id);
    }, [todolistId, task.id]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(todolistId, task.id, newValue);
    }, [todolistId, task.id]);

    return (
        <div key={task.id} className={task.status === TaskStatuses.Completed ? 'isDone' : 'notIsDone'}>
            <Checkbox
                onChange={onChangeHandler}
                color="primary"
                checked={task.status === TaskStatuses.Completed}
            />
            <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});

export default Task;