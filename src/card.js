import React, {  useContext } from 'react';
import './index.css';
import { Context } from './context';

export const TaskCard = (props) => {
  const {removeTask, changeTitle, changeTask, postTask} = useContext(Context);

  return (
    <div className="card">
      <div className="card__header">
        <input
          className="card__title"
          type="text"
          placeholder="Title +"
          onBlur={e => changeTitle(props.taskList.id, props.task.num, e.target.value)}
          defaultValue={props.task.title}
        />
        <button
          className="card__button"
          onClick={() => removeTask(props.taskList.id, props.task.num)}
        >+</button>
      </div>
      <textarea
        className="card__text"
        cols="20"
        style = {{height: props.task.height}}
        placeholder="Note"
        onChange={e => changeTask(props.taskList.id, props.task.num, e)}
        onBlur={e=> postTask(e)}
        defaultValue={props.task.task}
      >
      </textarea>
    </div>
  )
}


