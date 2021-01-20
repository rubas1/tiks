import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { observer, inject } from 'mobx-react'

class SignUp extends Component {
  constructor(){
    super()
    this.state = {
      profileCreated: false
    }
  }
    
  handleUsernameInput = (event) =>{
    this.props.userManager.username = event.target.value
  }

  handlePasswordInput = (event) =>{
    this.props.userManager.password = event.target.value
  }

  handleNameInput = (event) =>{
    this.props.userManager.name = event.target.value
  }

  handleSurnameInput = (event) =>{
    this.props.userManager.surname = event.target.value
  }

  signUp = () => {
    let response = this.props.userManager.userSignUp()
    response.then((result) => {
      if(result === "Profile created successfuly"){
        this.setState({profileCreated: true})
      }
    })
  }

  render(){
    return(
      <div>
       {this.state.profileCreated ? <Link to="/" className="link"><h3>Registration Completed! go back to Log In page</h3></Link> : 
        <div className="registration-div">
          <input className="username-input" value={this.props.userManager.username} onChange={this.handleUsernameInput} placeholder={"username"}></input>
          <input className="password-input" value={this.props.userManager.password} onChange={this.handlePasswordInput} placeholder={"password"}></input>
          <input className="name-input" value={this.props.userManager.surname} onChange={this.handleNameInput} placeholder={"first name"}></input>
          <input className="surname-input" value={this.state.surnameInput} onChange={this.handleSurnameInput} placeholder={"last name"}></input>
          <button className="login-button" onClick={this.signUp}>Sign up</button>
        </div>}
     </div>
    )
  }
}
  
export default inject("userManager")(observer(SignUp))