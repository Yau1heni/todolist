import React from 'react';
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from './tasks-reducer';
import {TasksStateType} from '../../../../app/App';
import {TaskPriorities, TaskStatuses, TaskType} from '../../../../api/task-api';
import {addTodolistAC, removeTodolistAC} from '../todolists-reducer';

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: '1',
        title: 'CSS',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        deadline: '',
        startDate: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: 'todolistId1'
      },
      {
        id: '2',
        title: 'JS',
        status: TaskStatuses.Completed,
        addedDate: '',
        order: 0,
        deadline: '',
        startDate: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: 'todolistId1'
      },
      {
        id: '3',
        title: 'React',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        deadline: '',
        startDate: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: 'todolistId1'
      }
    ],
    todolistId2: [
      {
        id: '1',
        title: 'bread',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        deadline: '',
        startDate: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: 'todolistId2'
      },
      {
        id: '2',
        title: 'milk',
        status: TaskStatuses.Completed,
        addedDate: '',
        order: 0,
        deadline: '',
        startDate: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: 'todolistId2'
      },
      {
        id: '3',
        title: 'tea',
        status: TaskStatuses.New,
        addedDate: '',
        order: 0,
        deadline: '',
        startDate: '',
        description: '',
        priority: TaskPriorities.Low,
        todoListId: 'todolistId2'
      }
    ]
  };
});

test('correct task should be deleted from correct array', () => {
  const action = removeTaskAC({todolistId: 'todolistId2', taskId: '2'});
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(2);
  expect(endState['todolistId2'].every((t) => t.id != '2')).toBeTruthy();
  expect(endState['todolistId2'][0].id).toBe('1');
  expect(endState['todolistId2'][1].id).toBe('3');
});

test('correct task should be added to correct array', () => {
  const task: TaskType = {
    description: 'description',
    title: 'juice',
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: 'startDate',
    deadline: 'deadline',
    id: 'id1',
    todoListId: 'todolistId2',
    order: 1,
    addedDate: 'addedDate'
  };
  const action = addTaskAC(task);
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('juice');
  expect(endState['todolistId2'][0].status).toBe(0);
});

test('status of specified task should be changed', () => {
  const action = updateTaskAC({taskId: '2', todolistId: 'todolistId2', model: {status: TaskStatuses.New}});

  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].status).toBeFalsy();
  expect(endState['todolistId1'][1].status).toBeTruthy();
});

test('title of specified task should be changed', () => {
  const action = updateTaskAC({taskId: '2', todolistId: 'todolistId2', model: {title: 'MilkyWay'}});
  const endState = tasksReducer(startState, action);

  expect(endState['todolistId2'][1].title).toBe('MilkyWay');
  expect(endState['todolistId1'][1].title).toBe('JS');
});

test('new property with new array should be added when new todolist is added', () => {
  const action = addTodolistAC({todolist: {addedDate: '', order: 1, id: '20', title: 'title no matter'}});
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != 'todolistId1' && k != 'todolistId2');
  if (!newKey) {
    throw Error('new key should be added');
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});

test('property with todolistId should be deleted', () => {
  const action = removeTodolistAC({id: 'todolistId2'});
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState['todolistId2']).toBeUndefined();
});
