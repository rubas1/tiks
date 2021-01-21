import React, {Component} from 'react';
import  {useLocation, Link} from "react-router-dom";
import { observer,inject } from 'mobx-react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DoneOutlineIcon from '@material-ui/icons/Done';
import DeleteIcon from '@material-ui/icons/Delete';

const Task = inject("userManager","taskManager")(observer((props) => {
  let location = useLocation().pathname;
  let task = props.task
  let username = props.userManager.username

  const deleteTask = () =>{
    props.taskManager.deleteTask(username, task.id)
  }

  const deleteTemporaryTask = () => {
    props.taskManager.deleteTemporaryTask(task.title)
  }

    // updateTask = () => {
    //   let taskID = this.props.taskManager.currentTask.id
    //   let username = this.props.userManager.username
    //   let proprety
    //   this.props.taskManager.updateTask(username, taskID, )
    // }

    return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <DoneOutlineIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={task.title} />
      <ListItemText primary={task.place} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={location === '/home' || location === '/' ? deleteTask : deleteTemporaryTask}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
}))

export default Task