import React, {Component} from 'react';
import { observer,inject } from 'mobx-react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DoneOutlineIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

class Task extends Component {

    deleteTask = () =>
    {
      let task = this.props.taskManager.currentTask
      let username = this.props.userManager.username
      this.props.taskManager.deleteTask(username, task.id)
    }

    // updateTask = () => {
    //   let task = this.props.taskManager.currentTask
    //   let username = this.props.userManager.username
    //   this.props.taskManager.updateTask(username, task.id, )

    // }
    render() {
     let task = this.props.task
      return (
        <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DoneOutlineIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={task.title}
        />
        <ListItemText
          primary={task.place}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={this.deleteTask}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
        )
    }
  }
  
  export default inject("userManager","TaskManager")(observer(Task));