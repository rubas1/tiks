import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import NavBar from '../navbar/NavBar'
import Home from '../home/Home'

class TaskManagerContainer extends Component {

  render(){
    return (
    <div>
      <NavBar />
      <Home />
    </div>)
  }
}
  
export default observer(TaskManagerContainer);