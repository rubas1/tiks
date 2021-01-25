import React, {Component} from 'react';
import List from '@material-ui/core/List';
import { observer,inject } from 'mobx-react'
import Task from '../home/Task'

class TaskList extends Component {

  submitTasks = () => {
    let username = this.props.userManager.username
    let response = this.props.taskManager.submitTasks(username)
    this.props.taskManager.resetTaskInput()
  }

  render() {
    let tasks = this.props.taskManager.temporaryTasks.tasksList
    return(
    <div className="tasks-container">
      <List> {tasks.map((t,index) => <Task key={index} task={t}/>)} </List>
      <button type="submit" onClick={this.submitTasks}>Submit Tasks</button>
    </div>)
  }
}
  
  export default inject("userManager","taskManager")(observer(TaskList));