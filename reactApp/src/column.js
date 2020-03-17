import React from 'react';
import { TaskCard } from "./card";
import './index.css'

export const TaskColumn = (props) => (
    <div className = "column">
        <div className = "column__header">
            {props.taskList.list.length === 0 ? '' : <div className="column__counter">{props.taskList.list.length}</div>}
            <input className = "column__title"
                   type = "text"
                   placeholder = "Enter name +"
                   onBlur = {e => props.changeName(props.taskList.id, e.target.value)}
                   defaultValue={props.taskList.name}
            />
            <button
              className="column__delete"
              onClick={()=> props.removeTasklist(props.taskList.id)}
            >+</button>
        </div>
        <div className="column__body">
            {props.taskList.list.map(task => {
                return <TaskCard
                  key = {task.num}
                  task = {task}
                  taskList = {props.taskList}
                />
            })}
            <button
              className="column__button"
              onClick={() => props.addCard(props.taskList.id)}
            >+</button>
        </div>
    </div>
);





