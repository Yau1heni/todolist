import { tasksReducer } from "./Todolist/Task/tasks-reducer";
import { TasksStateType } from "../../app/App";
import { addTodolistAC, TodolistDomainType, todolistsReducer } from "./Todolist/todolists-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const action = addTodolistAC({todolist: {addedDate: '', order: 1, id: '20', title: 'new todolist'}});
  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
