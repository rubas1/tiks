import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { observer,inject } from 'mobx-react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import PlacesPopup from './PlacesPopup'
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

const AddTask =  inject("mapManager","taskManager","userManager")
(observer((props) => {
  let classes = useStyles();
  const handleTitleInput = (e) =>{
    let name = e.target.name
    let val = e.target.value
    props.taskManager.taskInput[name] = val
  }

  const handleSelector = (e) => {
    let selector = e.target.value
    props.mapManager.taskSearchBy = selector
  }

  const handleSearchInput = (e) => {
    let value = e.target.value
    if(props.mapManager.taskSearchBy === 'category'){
      props.mapManager.searchInput.category = value
    }else{
      props.mapManager.searchInput.location = value
    }
  }
  
  const addTemporaryTask = () => {
    props.taskManager.addTemporaryTask()

  }

  const updateTask = () => {
    let username = props.userManager.username
    let res = props.taskManager.updateCurrentTask(username)
    res.then(() => {
      props.taskManager.updatingTask = false
      props.taskManager.resetTaskInput()
    })
  }

  const handlePriority = (e) => {
    console.log(e.target.value)
    props.taskManager.taskInput.priority = e.target.value
  }

  const setStartTime = (date) => {
    props.taskManager.taskInput.startTime = date
    console.log(props.taskManager.taskInput.startTime)
  }

  const setEndTime = (date) => {
    props.taskManager.taskInput.endTime = date
  }

  const startSearch = () =>{
    props.mapManager.getNearPlacesByCategory()
  }

      return (
     <Container className={classes.paper,classes.root} >
      <Typography variant="h5" >
         {props.taskManager.updatingTask?'Update Task  ':`Let's Plan Your Day`}
      </Typography>
       <TextField
              id="title"
              label="title"
              name="title"
              value={props.taskManager.taskInput.title}
              onChange={handleTitleInput}
              autoFocus
            />
        <TextField
          id="select-search-by"
          select
          label="Search By"
          value={props.mapManager.taskSearchBy}
          onChange={handleSelector}
        >
           <MenuItem value='location'>
            Location
            </MenuItem>
            <MenuItem value='category'>
            Category
            </MenuItem>
        </TextField>
          <TextField
              id="location"
              label={props.mapManager.taskSearchBy}
              name="location"
              value={props.mapManager.taskSearchBy === "category" ? props.mapManager.searchInput.category : props.mapManager.searchInput.location}
              onChange={handleSearchInput}
            />
          <Button
            type="submit"
            width='10%'
            variant="contained"
            color="primary"
            style={{ fontSize: 10 }}
            onClick={startSearch}
          >
            Search
          </Button>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around" spacing={1}>
            <TimePicker
              name="startTime"
              id="time-picker"
              label="Start Time"
              disablePast
              value={props.taskManager.taskInput.startTime}
              onChange={setStartTime}
            />
            <TimePicker
              name="endTime"
              id="time-picker"
              label="End Time"
              disablePast
              value={props.taskManager.taskInput.endTime}
              onChange={setEndTime}
        
            />       
          </Grid>
      </MuiPickersUtilsProvider>
      <TextField
          id="taskPriority"
          name="priority"
          select
          label="Priority"
          value={props.taskManager.taskInput.priority}
          onChange={handlePriority}
        >
           <MenuItem value={1}>
           Low
            </MenuItem>
            <MenuItem value={2}>
            Medium
            </MenuItem>
            <MenuItem value={3}>
            High
            </MenuItem>
        </TextField>
          {props.taskManager.updatingTask ?
          <Link to="/home" style={{textDecoration: 'none'}}>
            <Button
          type="submit"
          width='20%'
          variant="contained"
          color="secondary"
          style={{ fontSize: 10 }}
          onClick={updateTask}
        >
          Update Task
        </Button></Link>
           :
           <Button
          type="submit"
          width='20%'
          variant="contained"
          color="primary"
          style={{ fontSize: 10 }}
          onClick={addTemporaryTask}
        >
          Add Task
        </Button>}
     </Container>
      )
  }))
  
  export default AddTask;