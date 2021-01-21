import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import NavBar from '../navbar/NavBar'
import Home from '../home/Home';
import LetsPlan from '../letsplan/LetsPlan'
import Routine from '../routine/Routine';

class TaskManagerContainer extends Component {

  render(){
    return (
    <div>
      <NavBar />
      <Route path="/" exact component={Home} />
      <Route path="/home" exact component={Home} />
      <Route path="/letsplan" exact component={LetsPlan} />
      <Route path="/routine" exact component={Routine} />
    </div>)
  }
}
  
export default observer(TaskManagerContainer);