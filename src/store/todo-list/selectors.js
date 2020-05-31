import { createSelector } from 'reselect'

const stateTodoLists = state => state.todoList;

export const todoListState = createSelector(
  stateTodoLists,
  state => state.data
);

export const counter = createSelector(
  stateTodoLists,
  state => state.data.map(taskList => taskList.list.length).reduce((a,b)=> a+b)
);


