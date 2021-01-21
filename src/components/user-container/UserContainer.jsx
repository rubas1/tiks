import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import TaskManagerContainer from '../tiks-container/taskManagerContainer/TaskManagerContainer'
import UserContainer from './components/user-container/UserContainer';



class UserContainer extends Component {
    
  render() {
    return(<div>
        
    </div>)
  }
}
  
export default inject("userManager")(observer(UserContainer));