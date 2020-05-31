import {
  INIT,
  ADD_CARD,
  ADD_LIST,
  CHANGE_TASK,
  CHANGE_TASK_TITLE,
  CHANGE_TASKLIST_NAME,
  REMOVE_TASK,
  REMOVE_TASKLIST
} from './types';
import { initialState } from "./state";

export const toDoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT:
      return {...state, data: initialTaskMap()};
    case ADD_CARD:
      return {...state, data: addCard(state.data, action.payload)};
    case ADD_LIST:
      return {...state, data: addList(state.data)};
    case CHANGE_TASK:
      return {...state, data: changeTask(state.data, action.payload)};
    case CHANGE_TASK_TITLE:
      return {...state, data: changeTitle(state.data, action.payload)};
    case CHANGE_TASKLIST_NAME:
      return {...state, data: changeName(state.data, action.payload)};
    case REMOVE_TASK:
      return {...state, data: removeTask(state.data, action.payload)};
    case REMOVE_TASKLIST:
      return {...state, data: removeTasklist(state.data, action.payload)};

    default: return initialState;
  }
};

const initialTaskMap = () => ([
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
]);

const addCard = (todoList, payload) => {
  const {id} = payload;
  return  todoList.map(taskList => {
    if (taskList.id === id) {
      const list = taskList.list;
      const number = list.length ? list.slice(-1)[0].num + 1 : 0;
      taskList.list = [...list, {num: number, task: ''}];
      return taskList
    }
    return taskList
  });
};

function addList(todoList) {
  // const getData =  await fetch('https://jsonplaceholder.typicode.com/users')
  //   .then(resolve => resolve.json())
  //   .catch(error => console.log(error));

  const lastId = todoList.length ? todoList.slice(-1)[0].id : null;

  const newList  = {
    id: lastId === null ? 0 : lastId + 1,
    name:'',
    list:[]
  };

  // if(getData.length) {
  //   newList.list = getData.map(user => ({
  //       num: user.id,
  //       title: user.name,
  //       task: user.email,
  //       height: 41
  //     })
  //   )
  // }
//
  return [...todoList, newList];
}

const changeName = (state, payload) => {
  const {id, string}= payload;
  return state.map(taskList => taskList.id === id ? { ...taskList, name: string } : taskList);
};

const changeTask =  (state, payload) => {
  const {id, num, e} = payload;
  const setNewHeight = event => {
    event.target.style.height = 'inherit';
    event.target.style.height = `${event.target.scrollHeight}px`;
    return event.target.style.height
  };
  return state.map(taskList => {
    if (taskList.id === id) {
      taskList.list = taskList.list.map(card =>
        card.num === num ? {...card, task: e.target.value, height: setNewHeight(e)} : card
      )
    }
    return taskList
  });
};

//
// const postTask = async e => {
//   try {
//     const postData = await fetch('https://jsonplaceholder.typicode.com/posts', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json;charset=utf-8'},
//       body: JSON.stringify({inputData: e.target.value})
//     });
//     const res = await postData.json();
//     console.log('success:', JSON.stringify(res))
//   } catch (error) {
//     console.warn(error)
//   }
// };

const changeTitle = (state, payload) => {
  const {id, num, string} = payload;
  return state.map(taskList => {
    if (taskList.id === id) {
      taskList.list = taskList.list.map(card =>
        card.num === num ? { ...card, title: string} : card
      )
    }
    return taskList
  });
};

const removeTask = (state, payload) => {
  const {id, num} = payload;
  return state.map(taskList => {
    if (taskList.id === id) taskList.list = taskList.list.filter(task => task.num !== num);
    return taskList
  });
};

function removeTasklist (todoList, payload){
  const {id} = payload;
  return  todoList.filter(list => list.id !== id);
}