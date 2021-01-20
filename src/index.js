import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'mobx-react'
import TaskManager from '../src/store/TaskManager'
import UserManager from '../src/store/UserManager'
import RoutineManager from '../src/store/RoutineManager'

const taskManager = new TaskManager()
const userManager = new UserManager()
const routineManager = new RoutineManager()

const stores = {
  taskManager,
  userManager,
  routineManager
}

ReactDOM.render(
  <Provider {... stores}>
  <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
