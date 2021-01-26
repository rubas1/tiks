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
import {
  MuiPickersUtilsProvider,
  TimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

class AddRoutine extends Component {

  constructor(){
    super()
    this.state = {
      saved: false,
    }
  }


  handleTitle = (e) => this.props.routineManager.routineInput.title = e.target.value

  handleDays = (e) => {
    this.props.routineManager.addDay(e.target.value)
    // let day = e.target.value
    // this.props.routineManager.routineInput.days[day] = !this.props.routineManager.routineInput.days[day]
    // console.log(this.props.routineManager.routineInput.days)
    // this.setState({checkedDays: this.props.routineManager.getCheckedDays()},()=>console.log(this.props.routineManager.routineInput.days))
  }
  

  handleLocation = (e) => this.props.routineInput.location = e.target.value

  setStartTime = (date) => {
    this.props.routineManager.routineInput.startTime = date
  }

  setEndTime = (date) => {
    this.props.routineManager.routineInput.endTime = date
  }

  addRoutine = () =>
  {
    this.props.routineManager.addRoutine(this.props.userManager.username)
    this.setState({saved: true})
  }

  closeAddRoutine = () => this.props.close()

  render() {
    let days = ["sunday","monday"]
      return (
     <div>
        <h3>New routine</h3>
        <div>
          <div> Title </div>
          <input name="routineTitle" type="text" placeholder="title..." value={this.props.routineManager.routineInput.title} onChange={this.handleTitle}/>
       </div>
       <div>
          <span>Location </span>
          <input name="routineLocation" type="text" placeholder="location..." value={this.props.routineManager.routineInput.location} onChange={this.handleLocation}/>
       </div>

        <InputLabel id="select-multiple-days">Select Days </InputLabel>
        <Select
          name="days"
          labelId="select-multiple-days-label"
          id="select-multiple-days-checkbox"
          multiple
          value={this.props.routineManager.days}
          onChange={this.handleDays}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
        >
          {days.map((day) => (
            <MenuItem key={day} value={day}>
              <Checkbox checked={this.props.routineManager.
             days.indexOf(day) > -1} />
              <ListItemText primary={day} />
            </MenuItem>
          ))}
        </Select>
        <h4>Approximate Time </h4>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <TimePicker
              name="routineStartTime"
              margin="normal"
              id="time-picker"
              label="Start Time"
              disablePast
              value={this.props.routineManager.routineInput.startTime}
              onChange={this.setStartTime}
        
            />
            <TimePicker
              name="routineEndTime"
              margin="normal"
              id="time-picker"
              label="End Time"
              disablePast
              value={this.props.routineManager.routineInput.endTime}
              onChange={this.setEndTime}
        
            />
          </Grid>
      </MuiPickersUtilsProvider>
      {!this.state.saved ? <button onClick={this.addRoutine}>Save</button> : <button onClick={this.closeAddRoutine}>X</button>}
     </div>
        )
    }
  }
  
  export default inject("userManager","taskManager","routineManager")(observer(AddRoutine));