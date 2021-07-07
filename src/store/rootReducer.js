import { combineReducers } from 'redux';
import { toDoListReducer } from './todo-list/toDoListReducer';

export const rootReducers = combineReducers({ todoList: toDoListReducer });