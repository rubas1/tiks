import React, {Component} from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { observer,inject } from 'mobx-react'

class LetsPlan extends Component {
  render() {
    return (
    <div className="lets-plan">
      <AddTask />
      {this.props.taskManager.updatingTask ? null : <TaskList />}
    </div>)
  }
}
  
  export default inject("userManager","taskManager")(observer(LetsPlan));