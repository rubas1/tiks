import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { observer, inject } from 'mobx-react'

class SignIn extends Component {

  handleUsernameInput = (event) =>{
    this.props.userManager.username = event.target.value
  }

  handlePasswordInput = (event) =>{
    this.props.userManager.password = event.target.value
  }

  logIn = () => {
    let response = this.props.userManager.userSignIn()
  }

  render(){
    return(
      <div>
       <input className="username-input" value={this.props.userManager.username} onChange={this.handleUsernameInput} placeholder={"enter your username"}></input>
       <input className="password-input" value={this.props.userManager.password} onChange={this.handlePasswordInput} placeholder={"enter your password"}></input>
       <button className="login-button" onClick={this.logIn}>Log In</button>
       <h3>Haven't registered yet? Sign up now</h3>
       <Link to="/signup" className="link">
        <button className="register-button">Register here</button>
       </Link>
     </div>
    )
  }
}
  
  export default inject("userManager")(observer(SignIn))