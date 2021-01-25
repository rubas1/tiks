import React, {Component} from 'react';
import { observer,inject } from 'mobx-react'

class HeaderDate extends Component {
  inputHandler = (e) =>{
    this.props.taskManager.currentDate = e.target.value
  }

  getTasks = () =>{
    let username = this.props.userManager.username
    this.props.taskManager.getTasks(username)
  }
  
  render() {
    let name = this.props.userManager.name
    console.log(this.props.taskManager.currentDate)
    return(<div className="header-date">
      <div className="user-welcome">
        <h3>Welcome Back, {name}.</h3>
        <h5>Let's Organize Your Day</h5>
        </div>
        <div className="date-picker">
          <label htmlFor="day">Pick Planning Date </label>
          <input type="date" id="day" name="day" value={this.props.taskManager.currentDate} onChange={this.inputHandler}></input>
          <button className="get-tasks" onClick={this.getTasks}>get tasks</button>
       </div>
     </div>
    )
  }
}
  
  export default inject("userManager","taskManager")(observer(HeaderDate));