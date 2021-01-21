import React,{Component} from 'react';
import { observer,inject } from 'mobx-react'
import List from '@material-ui/core/List';
import Task from './Task';

class TasksView extends Component{

  render(){
    let tasks = this.props.taskManager.tasks
    return (<div className="tasks-container">
      {<List> {tasks.map((t,index) => <Task key={index} task={t}/>)} </List>}
    </div>)
  }
}
  
  export default inject("userManager","taskManager")(observer(TasksView));;