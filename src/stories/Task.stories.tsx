import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import Task from '../Task';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {
      changeTaskStatus: action('changeTaskStatus'),
      changeTaskTitle: action('changeTaskTitle'),
      removeTask: action('removeTask'),
      todolistId: '1a',
      task: {id: '1', title: 'js', isDone: true},
    },
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
  task: {id: '2', title: 'js', isDone: false},
};