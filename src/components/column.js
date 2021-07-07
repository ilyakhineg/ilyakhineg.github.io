import React from 'react';
import { useDispatch } from 'react-redux';
import { TaskCard } from "./card";
import { addCard, changeTasklistName, removeTasklist } from "../store/todo-list/actions";
import '../styles/index.css'

export const TaskColumn = ({ taskList, id }) => {
  const dispatch = useDispatch();
  const dispatchChangeTasklistName = (id, string) => dispatch(changeTasklistName(id, string));

  return (
    <div className = "column">
      <div className = "column__header">
        {taskList.list.length === 0 ? '' : <div className="column__counter">{taskList.list.length}</div>}
        <input className = "column__title"
               type = "text"
               placeholder = "Enter name +"
               onBlur = {e => dispatchChangeTasklistName(taskList.id, e.target.value)}
               defaultValue={taskList.name}
        />
        <button
          className="column__delete"
          onClick={()=> dispatch(removeTasklist(taskList.id))}
        >+</button>
      </div>
      <div className="column__body">
        {taskList.list.map(task => <TaskCard key={task.num} task={task} taskList={taskList} />)}
        <button
          className="column__button"
          onClick={() => dispatch(addCard(id))}
        >+</button>
      </div>
    </div>
  )
};







