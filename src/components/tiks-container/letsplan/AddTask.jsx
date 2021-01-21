import React, {Component} from 'react';
import { observer,inject } from 'mobx-react'
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


class AddTask extends Component {


  handleTitleInput = (e) =>
  {
    let name = e.target.name
    let val = e.target.value
    this.props.taskManager.taskInput[name] = val
  }
  
  addTemporaryTask = () =>
  {
    this.props.taskManager.addTemporaryTask()
  }

    render() {
      return (
     <div className="add-task">
       <h3>Let's Plan Your Day</h3>
       <div>
          <div>Task Title </div>
          <input name="title" type="text" placeholder="task title..." value={this.props.taskManager.taskInput.title} onChange={this.handleTitleInput}/>
       </div>
       <div>
          <span>Search By </span>
          <select name="taskSearchBy" id="taskSearchBy" value={this.props.GeneralStore.taskSearchBy} onChange={this.inputHandler}>
          <option value="place">Place</option>
          <option value="category">Category</option>
          </select>
          <br></br>
          <input name="place" type="text" placeholder="place..." value={this.props.taskManager.taskInput.place} onChange={this.inputHandler}/>
       </div>
            <div>Approximate Time </div>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <TimePicker
              name="startTime"
              margin="normal"
              id="time-picker"
              label="Start Time"
              disablePast
              value={this.props.taskManager.taskInput.startTime}
              onChange={this.handleTitleInput}
        
            />
            <TimePicker
              name="endTime"
              margin="normal"
              id="time-picker"
              label="End Time"
              disablePast
              value={this.props.taskManager.taskInput.endTime}
              onChange={this.handleTitleInput}
        
            />
          </Grid>
      </MuiPickersUtilsProvider>
       <div className="task-priority">
            <span>Priority </span>
            <select name="priority" id="taskPriority" value={this.props.taskManagr.taskInput.props} onChange={this.handleTitleInput}>
            <option value={1}>Low</option>
            <option value={2}>Medium</option>
            <option value={3}>High</option>
            </select>
       </div>
          <button type="submit" onClick={this.addTemporaryTask}>Add Task</button>
     </div>
        )
    }
  }
  
  export default inject("TaskManager")(observer(AddTask));