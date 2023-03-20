import { tasksSlice } from "./Todolist/Task/tasks-slice";
import { TasksStateType } from "../../app/App";
import { addTodolistAC, TodolistDomainType, todolistsSlice } from "./Todolist/todolists-slice";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const action = addTodolistAC({todolist: {addedDate: '', order: 1, id: '20', title: 'new todolist'}});
  const endTasksState = tasksSlice(startTasksState, action);
  const endTodolistsState = todolistsSlice(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
