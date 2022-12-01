import Checkbox from '@mui/material/Checkbox/Checkbox';
import React, {ChangeEvent, useCallback} from 'react';
import EditableSpan from './EditableSpan';
import {TaskType} from './Todolist';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';

type TaskPropsType = {
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
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
                                                             todolistId,
                                                         }) => {

    const onClickHandler = () => removeTask(todolistId, task.id);
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(todolistId, e.currentTarget.checked, task.id);
    };
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(todolistId, task.id, newValue);
    }, [changeTaskTitle, todolistId, task.id]);

    return (
            <div key={task.id} className={task.isDone ? 'isDone' : 'notIsDone'}>
                <Checkbox
                        onChange={onChangeHandler}
                        color="primary"
                        checked={task.isDone}
                />
                <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
                <IconButton onClick={onClickHandler}>
                    <Delete/>
                </IconButton>
            </div>
    );
});

export default Task;