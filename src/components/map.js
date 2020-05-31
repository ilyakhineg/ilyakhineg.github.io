import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskColumn } from './column';
import '../styles/index.css'
import { addList } from "../store/todo-list/actions";
import { counter, todoListState } from "../store/todo-list/selectors";

export const Map = () => {
  const state = useSelector(todoListState);
  const countTasks = useSelector(counter);
  const dispatch = useDispatch();
  const dispatchAddList = () => dispatch(addList());

  return(
    <div className = "app">
      <div className="navbar__container">
        <div className="navbar">
          {state.map(taskList => <button key={taskList.id} className="navbar__item">
            {taskList.name || taskList.id + 1}</button>
          )}
        </div>
      </div>
      <div className="container">
        {state.map(taskList => <TaskColumn key={taskList.id} id={taskList.id} taskList={taskList}/>)}
        <button
          className="app__button"
          onClick = {dispatchAddList}
        >+</button>
      </div>
      <div className="navbar__item">Итого задачек: {countTasks}</div>
    </div>
  )
};