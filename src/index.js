import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { TaskColumn } from './column';
import './index.css'
import { Context } from './context';

const App = () => {
  const initialState = () => JSON.parse(window.localStorage.getItem('taskMap')) || [
        {
          id: 0,
          name:'',
          list: [
            {num: 0,
              title: '',
              task: '',
              height: 41 }
          ]
        },
        {
          id: 1,
          name:'',
          list: []
        },
        {
          id: 2,
          name:'',
          list: []
        }
     ];

  const [ taskMap, setTaskMap ] = useState(initialState);

  useEffect(() => {
    const LsTaskMap = JSON.stringify(taskMap);
    window.localStorage.setItem('taskMap', LsTaskMap);
  }, [taskMap]);

  const [ offset, setOffset ] = useState(0);

  useEffect(() => {
    console.log(offset);

    // don`t work
    document.querySelector('.container').scrollTo( {
      left: offset,
      top: 0,
      behavior: 'smooth'
    } )
  });

  const addCard = (id) => {
    setTaskMap(taskMap.map(taskList => {
      if (taskList.id === id) {
        const list = taskList.list;
        list.push({
          num: list.length ? list.slice(-1)[0].num + 1 : 0,
          task: ''
        })
      }
      return taskList
    }));
  };

  const addList = async () => {
    let newColumn =  await fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json());
    let lastId = taskMap.length ? taskMap.slice(-1)[0].id : null,
        newList = [{
          id: lastId === null? 0 : lastId + 1,
          name:'',
          list: newColumn.map(user => {
            return {
              num: user.id,
              title: user.name,
              task: user.email,
              height: 41
            }
          })}];
    setTaskMap(taskMap.concat(newList));
    return taskMap;
  };

  const changeName = (id, string) => {
    setTaskMap(taskMap.map(taskList => {
      if (taskList.id === id) taskList.name = string;
      return taskList;
    }))
  };

  const changeTask = (id, num, e) => {
    setTaskMap(taskMap.map(taskList => {
      if (taskList.id === id) {
        taskList.list.map(card => {
          if (card.num === num) {
            card.task = e.target.value;
            e.target.style.height = 'inherit';
            e.target.style.height = `${e.target.scrollHeight}px`;
            card.height = e.target.style.height;
          }
        })
      }
      return taskList
    }))
  };

  const changeTitle = (id, num, title) => {
    setTaskMap(taskMap.map(taskList => {
      if (taskList.id === id) {
        taskList.list.map(card => {
          if (card.num === num) card.title = title;
        })
      }
      return taskList
    }))
  };

  const removeTask = (id, num) => {
    setTaskMap(taskMap.map(taskList => {
      if (taskList.id === id) taskList.list = taskList.list.filter(task => task.num !== num);
      return taskList
    }))
  };

  const removeTasklist = (id) =>{
    setTaskMap(taskMap.filter(tasklist => tasklist.id !== id));
    return taskMap;
  };

  return(
    <Context.Provider value = {{removeTask, changeTitle, changeTask}}>
      <div className = "app">
        <div className="navbar__container">
          <div className="navbar">
            {taskMap.map(taskList => {
              return <button
                key = {taskList.id}
                className="navbar__item"
                onClick={()=> setOffset(taskList.id*300)}
              >{taskList.name || taskList.id + 1}</button>
            })}
          </div>
        </div>
        <div className="container">
          {taskMap.map(taskList => {
            return <TaskColumn
              key = {taskList.id}
              id = {taskList.id}
              taskList = {taskList}
              addCard = {addCard}
              removeTasklist ={removeTasklist}
              changeName = {changeName}
            />
          })}
          <button
            className="app__button"
            onClick = {() => addList()}
          >+</button>
        </div>
      </div>
    </Context.Provider>
  )
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
