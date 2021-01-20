import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import TaskManagerContainer from '../tiks-container/taskManagerContainer/TaskManagerContainer'
import SignIn from './SignIn';


class UserContainer extends Component {
    
  render() {
    return(
      <div>
        {this.props.userManager.logged ? <TaskManagerContainer /> : null}
      </div>
    )
  }
}
  
export default inject("userManager")(observer(UserContainer));