import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import './App.css';
import SignIn from './components/user-container/SignIn'
import SignUp from './components/user-container/SignUp'
import TaskManagerContainer from './components/tiks-container/taskManagerContainer/TaskManagerContainer'
import LetsPlan from './components/tiks-container/letsplan/LetsPlan'

class App extends Component {

  render() {
   
    return (
    <Router>
      <div className="App">
        {/* <LetsPlan /> */}
        {console.log(this.props.userManager.logged)}
        {this.props.userManager.logged ? <TaskManagerContainer /> : <Route path="/" exact component={SignIn} />}
        <Route path="/signup" exact component={SignUp} />
        {/* <Route path="/signin" exact component={SignIn} /> */}
    </div>
    </Router>)
  }
}

export default inject("userManager")(observer(App))
