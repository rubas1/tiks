import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router,Route,Link } from "react-router-dom";
import './App.css';
import UserContainer from './components/user-container/UserContainer';
import Home from './components/tiks-container/home/Home';
import LetsPlan from './components/tiks-container/letsplan/LetsPlan'
import Routine from './components/tiks-container/routine/Routine';
import SignIn from './components/user-container/SignIn'
import SignUp from './components/user-container/SignUp'
import TaskManagerContainer from './components/tiks-container/taskManagerContainer/TaskManagerContainer'

class App extends Component {

  render() {
   
    return (<Router>
      <div className="App">
        <UserContainer />
        <Route path="/" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/home" exact component={Home} />
        <Route path="/letsplan" exact component={LetsPlan} />
        <Route path="/routine" exact component={Routine} />
        <Route path="/thetiks" exact component={TaskManagerContainer} />
      </div>
    </Router>
    )
  }
}

export default observer(App)
