import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import './App.css';
import SignIn from './components/user-container/SignIn'
import SignUp from './components/user-container/SignUp'
import TaskManagerContainer from './components/tiks-container/taskManagerContainer/TaskManagerContainer'

class App extends Component {

  render() {
   
    return (<Router>
      <div className="App">
        {this.props.userManager.logged ? <TaskManagerContainer /> : <SignIn />}
        <Route path="/signup" exact component={SignUp} />
    </div>
    </Router>)
  }
}

export default inject("userManager")(observer(App))
