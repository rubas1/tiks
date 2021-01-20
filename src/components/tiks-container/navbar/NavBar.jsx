import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

class NavBar extends Component {
  render(){
    return(
      <div className="navbar-div">
        <Link to="/home" className="link">Home</Link>
        <Link to="/letsplan" className="link">Let's plane</Link>
        <Link to="/routine" className="link">Routine</Link>
        <Link to="/report" className="link">Report</Link>
      </div>
    )
  }
}
export default NavBar;