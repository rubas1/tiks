import React, {Component} from 'react';
import List from '@material-ui/core/List';
import { observer,inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Link} from 'react-router-dom'
import Task from '../home/Task'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiButton-root':{
      margin: theme.spacing(1),
      width: 200,
      backgroundColor: theme.palette.secondary.main,
    }
  }

}));
const TaskList = inject("mapManager","taskManager","userManager")
(observer((props) => {
  let classes = useStyles();

  const submitTasks = () => {
    let username = props.userManager.username
    let response = props.taskManager.submitTasks(username)
    props.taskManager.resetTaskInput()
    props.mapManager.searchInput[props.mapManager.taskSearchBy] = ""
    props.mapManager.taskSearchBy= "category"
  }
    let tasks = props.taskManager.temporaryTasks.tasksList
    return(
    <div className={classes.root}>
      <List> {tasks.map((t,index) => <Task key={index} task={t}/>)} </List>
      <Link to="/home" style={{textDecoration: 'none'}}>
      <Button
            type="submit"
            width='20%'
            variant="contained"
            color="primary"
            style={{ fontSize: 10 }}
            onClick={submitTasks}
          >
            Submit Tasks
          </Button>
          </Link>
    </div>)
    
}))
  
  export default TaskList;