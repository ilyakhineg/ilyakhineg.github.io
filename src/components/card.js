import React from 'react';
import { useDispatch } from 'react-redux';
import { changeTask, changeTaskTitle, removeTask } from "../store/todo-list/actions";
import '../styles/index.css';

export const TaskCard = ({ taskList, task }) => {
  const dispatch = useDispatch();
  const dispatchChangeTask = (id, num, e) => dispatch(changeTask(id, num, e));
  const dispatchChangeTaskTitle = (id, num, string) => dispatch(changeTaskTitle(id, num, string));
  const dispatchRemoveTask = (id, num) => dispatch(removeTask(id, num));

  return (
    <div className="card">
      <div className="card__header">
        <input
          className="card__title"
          type="text"
          placeholder="Title +"
          onBlur={e => dispatchChangeTaskTitle(taskList.id, task.num, e.target.value)}
          defaultValue={task.title}
        />
        <button
          className="card__button"
          onClick={() => dispatchRemoveTask(taskList.id, task.num)}
        >+</button>
      </div>
      <textarea
        className="card__text"
        cols="20"
        style = {{height: task.height}}
        placeholder="Note"
        onChange={e => dispatchChangeTask(taskList.id, task.num, e)}
        defaultValue={task.task}
      >
      </textarea>
    </div>
  )
};


