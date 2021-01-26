import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import { observer,inject } from 'mobx-react'
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'grid',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
    '& .MuiButton-root':{
      margin: theme.spacing(1),
      width: 200,
    },
      '& .MuiTimePicker-root':{
        margin: theme.spacing(1),
        width: 100,
      },
    backgroundColor: 'white'
    }
  }));
  
const AddRoutine =  inject("userManager","routineManager")
(observer((props) =>
{
  let classes = useStyles();
  let days= ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

  const setRoutineLocation = (event) =>
  {
    props.routineManager.routineInput.location = event.target.value
  }
  const setRoutineTitle = (event) => 
  {
    props.routineManager.routineInput.title = event.target.value
  }

  const setRoutineStartTime = (date) => {

    props.routineManager.routineInput.startTime = date
  }

  const setRoutineEndTime = (date) => {

    props.routineManager.routineInput.endTime = date
  }

  const inputHandler = (event) => 
  {
    props.routineManager.handleInput(event)
  }

  const addRoutine = () =>
  {
    let username = props.userManager.username
    props.routineManager.addRoutine(username)
  }
  const addDay = (day) =>
  {
    props.routineManager.addDay(day)
  }

      return (
        <Container className={classes.paper,classes.root} >
      <Typography variant="h5" >
         Daily Routines
      </Typography>
      <TextField
              id="title"
              label="Title"
              name="title"
              value={props.routineManager.routineInput.title}
              onChange={setRoutineTitle}
              autoFocus
            />
        <TextField
              id="location"
              label="Location"
              name="location"
              value={props.routineManager.routineInput.location}
              onChange={setRoutineLocation}
            />
        <InputLabel id="select-multiple-days">Select Days </InputLabel>
        <Select
          name="days"
          labelId="select-multiple-days-label"
          id="select-multiple-days-checkbox"
          multiple
          value={props.routineManager.days}
          onChange={inputHandler}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
        >
          {days.map((day) => (
            <MenuItem key={day} value={day}>
              <Checkbox checked={props.routineManager.days.indexOf(day) > -1} />
              <ListItemText primary={day} />
            </MenuItem>
          ))}
        </Select>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <TimePicker
              name="routineStartTime"
              margin="normal"
              id="time-picker"
              label="Starting Hours"
              disablePast
              value={props.routineManager.routineInput.startTime}
              onChange={setRoutineStartTime}
        
            />
            <TimePicker
              name="routineEndTime"
              margin="normal"
              id="time-picker"
              label="Ending Hours"
              disablePast
              value={props.routineManager.routineInput.endTime}
              onChange={setRoutineEndTime}
        
            />
          </Grid>
      </MuiPickersUtilsProvider>
      <Button
          type="submit"
          width='20%'
          variant="contained"
          color="secondary"
          style={{ fontSize: 10 }}
          onClick={addRoutine}
        >
          Add Routine
        </Button>   
          </Container>
        )
    
  }))
  
  export default AddRoutine;