import { ADD_CARD, ADD_LIST, CHANGE_TASK, CHANGE_TASK_TITLE, CHANGE_TASKLIST_NAME, REMOVE_TASK, REMOVE_TASKLIST } from './types';

export const addCard = id => ({
  type: ADD_CARD,
  payload: {
    id: id
  }
});

export const addList = () => ({type: ADD_LIST});

export const changeTask = (id, num, e) => ({
  type: CHANGE_TASK,
  payload : {
    id: id,
    num: num,
    e: e
  }
});

export const changeTaskTitle = (id, num, string) => ({
  type: CHANGE_TASK_TITLE,
  payload: {
    id: id,
    num: num,
    string: string
  }
});

export const changeTasklistName = (id, string) => ({
  type: CHANGE_TASKLIST_NAME,
  payload: {
    id: id,
    string: string
  }
});

export const removeTask = (id, num) => ({
  type: REMOVE_TASK,
  payload: {
    id: id,
    num: num
  }
});

export const removeTasklist  = id => ({
  type: REMOVE_TASKLIST,
  payload: {
    id: id
  }
});
