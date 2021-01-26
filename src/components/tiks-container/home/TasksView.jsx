import React,{Component} from 'react';
import { observer,inject } from 'mobx-react'
import List from '@material-ui/core/List';
import Task from './Task';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  tasks: {
    backgroundColor: 'lightgrey',
    display: 'absolute',
    borderRadius: 5,
    width: '100vw',
  },
  tasksTitle: {
    color: 'white',
    fontSize: 20,
    backgroundColor: theme.palette.primary.main,
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    borderRadius: 5,
  }
}));
const TasksView = inject("userManager","taskManager")(observer((props) => {
    const classes = useStyles();
    let tasks = props.taskManager.tasks
    console.log(tasks)
    return (<div className={classes.tasks}>
      <div className={classes.tasksTitle}>Tasks For This Day</div>
      {<List> {tasks.map((t,index) => <Task key={index} task={t}/>)} </List>}
    </div>)
}))
  
export default TasksView;