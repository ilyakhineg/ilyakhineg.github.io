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

  /**
   * adds new card to list of tasks
   * @param {number} id - list id
   */

  const addCard = (id) => {
    const newCard = taskMap.map(taskList => {
      if (taskList.id === id) {
        const list = taskList.list;
        list.push({
          num: list.length ? list.slice(-1)[0].num + 1 : 0,
          task: ''
        })
      }
      return taskList
    });
    setTaskMap(newCard)
  };

  const addList = async () => {
    const getData =  await fetch('https://jsonplaceholder.typicode.com/users')
      .then(resolve => resolve.json())
      .catch(error => console.log(error));

    const lastId = taskMap.length ? taskMap.slice(-1)[0].id : null;

    const newList  = {
      id: lastId === null ? 0 : lastId + 1,
      name:'',
      list:[]
    };

    if(getData.length) {
      newList.list = getData.map(user => ({
            num: user.id,
            title: user.name,
            task: user.email,
            height: 41
          })
      )
    }

    setTaskMap([...taskMap, newList])
  };

  /**
   * changes name of specified list
   * @param {number} id - list id
   * @param {string} string - new name
   */
  const changeName = (id, string) => {
    const newName = taskMap.map(taskList =>
      taskList.id === id ? { ...taskList, name: string } : taskList
    );

    setTaskMap(newName);
  };

  /**
   * changes card test and height
   * @param {number} id - list id
   * @param {number} num - card num
   * @param {object} e - event
   */
  const changeTask = (id, num, e) => {
    const setNewHeight = event => {
      event.target.style.height = 'inherit';
      event.target.style.height = `${event.target.scrollHeight}px`;
      return event.target.style.height
    };

    const newTask = taskMap.map(taskList => {
      if (taskList.id === id) {
         taskList.list.map(card =>
          card.num === num ? {...card, task: e.target.value, height: setNewHeight(e)} : card
        )
      }
      return taskList
    });

    setTaskMap(newTask)
  };

  const changeTitle = (id, num, string) => {
    const newTitle = taskMap.map(taskList => {
      if (taskList.id === id) {
        taskList.list.map(card =>
          card.num === num ? { ...card, title: string} : card
        )
      }
      return taskList
    });
    setTaskMap(newTitle)
  };

  const removeTask = (id, num) => {
    const newTaskList = taskMap.map(taskList => {
      if (taskList.id === id) taskList.list = taskList.list.filter(task => task.num !== num);
      return taskList
    });
    setTaskMap(newTaskList)
  };

  const removeTasklist = (id) =>{
    const newTaskMap = taskMap.filter(tasklist => tasklist.id !== id);
    setTaskMap(newTaskMap);
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
            onClick = {addList}
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
