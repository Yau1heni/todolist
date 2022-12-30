import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import Task from '../features/TodolistsList/Todolist/Task/Task';
import {action} from '@storybook/addon-actions';
import {TaskPriorities, TaskStatuses} from '../api/task-api';

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle'),
        removeTask: action('removeTask'),
        todolistId: '1a',
        task: {id: '1', title: 'js', status: TaskStatuses.Completed, addedDate: '',
            order: 0, deadline: '', startDate: '', description: '',
            priority: TaskPriorities.Low, todoListId: 'todolistId1'}
    }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    task: {
        id: '2', title: 'js', status: TaskStatuses.New, addedDate: '',
        order: 0, deadline: '', startDate: '', description: '',
        priority: TaskPriorities.Low, todoListId: 'todolistId1'
    }
};

