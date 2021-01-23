import React, {Component} from 'react';
import { observer,inject } from 'mobx-react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import PlacesPopup from './PlacesPopup'
import {
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


class AddTask extends Component {


  handleTitleInput = (e) =>{
    let name = e.target.name
    let val = e.target.value
    this.props.taskManager.taskInput[name] = val
  }

  handleSelector = (e) => {
    let selector = e.target.value
    this.props.mapManager.taskSearchBy = selector
  }

  handleSearchInput = (e) => {
    let value = e.target.value
    if(this.props.mapManager.taskSearchBy === 'category'){
      this.props.mapManager.searchInput.category = value
    }else{
      this.props.mapManager.searchInput.location = value
    }
  }
  
  addTemporaryTask = () => {
    this.props.taskManager.addTemporaryTask()
  }

  setStartTime = (date) => {
    this.props.taskManager.taskInput.startTime = date
  }

  setEndTime = (date) => {
    this.props.taskManager.taskInput.endTime = date
  }

  startSearch = () =>{
    this.props.mapManager.getNearPlacesByCategory()
  }

  // searchInputVal = () => 

    render() {
      return (<div>{this.props.mapManager.showPlacesPopup ? <PlacesPopup /> : null}
     <div className="add-task">
       <h3>Let's Plan Your Day</h3>
       <div className="newTask-container">
          <h5>Task Name </h5>
          <input name="title" type="text" placeholder="task name..." value={this.props.taskManager.taskInput.title} onChange={this.handleTitleInput}/>
          <h5>Search By</h5>
          <select name="taskSearchBy" id="taskSearchBy" value={this.props.mapManager.taskSearchBy} onChange={this.handleSelector}>
            <option value="location">Location</option>
            <option value="category">Category</option>
          </select>
          <br></br>
          <input name="place" type="text" placeholder={this.props.mapManager.taskSearchBy} value={this.props.mapManager.taskSearchBy === "category" ? this.props.mapManager.searchInput.category : this.props.mapManager.searchInput.location} onChange={this.handleSearchInput} />
          <button className="search" onClick={this.startSearch}>search</button>
       </div>
       {/* <div>Approximate Time</div> */}
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <TimePicker
              name="startTime"
              margin="normal"
              id="time-picker"
              label="Start Time"
              disablePast
              value={this.props.taskManager.taskInput.startTime}
              onChange={this.setStartTime}
            />
            <TimePicker
              name="endTime"
              margin="normal"
              id="time-picker"
              label="End Time"
              disablePast
              value={this.props.taskManager.taskInput.endTime}
              onChange={this.setEndTime}
        
            />
          </Grid>
      </MuiPickersUtilsProvider>
       <div className="task-priority">
            <span>Priority </span>
            <select name="priority" id="taskPriority" value={this.props.taskManager.taskInput.priority} onChange={this.handleTitleInput}>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
            </select>
       </div>
          <button type="submit" onClick={this.addTemporaryTask}>Add Task</button>
     </div></div>
      )
    }
  }
  
  export default inject("mapManager","taskManager")(observer(AddTask));