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
import LetsPlan from '../letsplan/LetsPlan'

const Task = inject("userManager","taskManager","routineManager")(observer((props) => {
  let location = useLocation().pathname;
  let task = props.task
  let username = props.userManager.username

  const deleteTask = () =>{
     props.taskManager.deleteTask(username, task.id)
  }

  const deleteTemporaryTask = () => {
    // props.taskManager.deleteTemporaryTask(task.title)
    console.log("delete from letsplan")
  }

  const updateTask = () => {
    props.taskManager.taskInput = {id: task.id, title: task.title, location: task.location, startTime: new Date(), endTime: new Date(), priority: task.priority}
    props.taskManager.updatingTask = true
  }

  const taskCompleted = () => props.taskManager.taskCompleted(username, task.id)

  const deleteRoutine = () => props.routineManager.deleteRoutine(username, task.id)

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <DoneOutlineIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={task.title} />
      <ListItemText primary={task.title} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={location === '/home' || location === '/' ? deleteTask : deleteTemporaryTask}>
          <DeleteIcon />
        </IconButton>
        {location === '/home' || location === '/' ? <Link to="/letsplan"><button className="updateTask" onClick={updateTask}>update</button></Link> : null}
        {location === '/home' ? <button className="complete-task" onClick={taskCompleted}>{task.completed ? "completed" : "complete task"}</button> :null}
      </ListItemSecondaryAction>
    </ListItem>
  )
}))

export default Task