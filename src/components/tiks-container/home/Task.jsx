import React, {useEffect} from 'react';
import  {useLocation, Link} from "react-router-dom";
import { observer,inject } from 'mobx-react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DoneOutlineIcon from '@material-ui/icons/DoneOutlineOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import PriorityHighOutlinedIcon from '@material-ui/icons/PriorityHighOutlined'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  item: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 10,
    marginTop: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white'
  },
  title: {
    color: 'white'
  },
  icons: {
    margin: theme.spacing(0.2),
    backgroundColor: theme.palette.secondary.main,
    color: 'white'
  }

}));



const Task = inject("userManager","taskManager","routineManager")(observer((props) => {
const classes = useStyles();
  let location = useLocation().pathname;
  let task = props.task
  let username = props.userManager.username


  const deleteTask = () =>{
     props.taskManager.deleteTask(username, task.id)
  }

  const deleteTemporaryTask = () => {
    props.taskManager.deleteTemporaryTask(task.title)
    console.log("delete from letsplan")
  }

  const updateTask = () => {

    props.taskManager.updatingTask = true
    props.taskManager.taskInput = {id: task.id, title: task.title, location: task.location, startTime: new Date(), endTime: new Date(), priority: task.priority}
   
  }

  const taskCompleted = () => 
  {
    if(!task.completed)
    {
      props.taskManager.taskCompleted(username, task.id)
    }
    
  }

  const deleteRoutine = () => props.routineManager.deleteRoutine(username, task.id)

  return (
    <ListItem className={classes.item} >
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
          {
            task.completed?
            <DoneOutlineIcon />
            :
            <PriorityHighOutlinedIcon/>
          }
        </Avatar>
      </ListItemAvatar>

      <ListItemText className={classes.title} primary={task.title} />
      <ListItemText className={classes.title} primary={task.place} />

      <ListItemSecondaryAction>
        <IconButton className={classes.icons}  aria-label="delete" onClick={location === '/home' || location === '/' ?
         deleteTask :
          deleteTemporaryTask}>
          <DeleteIcon />
        </IconButton>
        {location === '/home' || location === '/' ?
           <IconButton className={classes.icons} onClick={updateTask}>
             <EditOutlinedIcon/>
           </IconButton>

          : null}
          {location === '/home' || location === '/'?
          <IconButton className={classes.icons} onClick={taskCompleted}>
          {task.completed?
          <CheckBoxOutlinedIcon/>
          :
          <CheckBoxOutlineBlankIcon/>
          }
          </IconButton>
          :
          null}

      </ListItemSecondaryAction>
    </ListItem>
  )
}))

export default Task