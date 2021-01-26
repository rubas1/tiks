import React, {Component} from 'react';
import List from '@material-ui/core/List';
import { observer,inject } from 'mobx-react'
import RoutineView from './RoutineView'
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
const RoutineList =  inject("userManager","routineManager")
(observer((props) => {

  const classes = useStyles();

    let routines = props.routineManager.routines
    return (<div className={classes.tasks}>
      <div className={classes.tasksTitle}>My Routines</div>
        <List> {routines.map((r,index) => <RoutineView key={index} routine={r}/>)} </List>
      </div>
    )
  }))
  
export default RoutineList;

// {}