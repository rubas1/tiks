import React, {Component} from 'react';
import  {useLocation, Link} from "react-router-dom";
import { observer,inject } from 'mobx-react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddAlarmOutlinedIcon from '@material-ui/icons/AddAlarmOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
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
const RoutineView = inject("userManager","taskManager","routineManager")(observer((props) => {
    const classes = useStyles();

    const getDaysSelected = (days) =>
    {
        let retDays = []
        days.forEach(d => {
            console.log(d)
            retDays.push(d.slice(0,2))
        })
        console.log(retDays)
        return retDays
    }
    
    let routine = props.routine
    console.log(routine.days)
    let username = props.userManager.username
    let allDays = ['Su','Mo','Tu','We','Th','Fr','Sa']
    let days = getDaysSelected(routine.days)
    console.log(days)
     const deleteRoutine = () => props.routineManager.deleteRoutine(username, routine.id)
   
    return(
    <ListItem className={classes.item} >
      <ListItemAvatar>
        <Avatar className={classes.avatar}>
            <AddAlarmOutlinedIcon/>
        </Avatar>
      </ListItemAvatar>
      <ListItemText className={classes.title} primary={routine.title} />
      {
            <ListItemText className={classes.title} primary={days.map(d => d + " ")}/>
              // allDays.includes(d)?
              
              // :
              // <ListItemText className={classes.title} primary={d} disabled/>
          }
      <ListItemSecondaryAction>
        <IconButton onClick={deleteRoutine} className={classes.icons}>
          <DeleteIcon />
        </IconButton>
        </ListItemSecondaryAction>
        </ListItem>
)
   }))
   
   export default RoutineView