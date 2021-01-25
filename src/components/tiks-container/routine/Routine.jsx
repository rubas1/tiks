import React, {Component} from 'react';
import AddRoutine from './AddRoutine';
import RoutineList from './RoutineList';
import { observer,inject } from 'mobx-react'
import SelectDaysPopUp from './SelectDaysPopUp';

class Routine extends Component {
  constructor(){
    super()
    this.state = {
      addingRoutine: false
    }
  }

  addRoutine = () => this.setState({addingRoutine: true})
  closeAddRoutine = () => {
    this.props.routineManager.getRoutines(this.props.userManager.username)
    this.setState({addingRoutine: false})
  }

  render() {
    return (<div className="routines-div">
      <h3>My daily routines</h3>
      {this.state.addingRoutine ? <AddRoutine close={this.closeAddRoutine} /> : null}
      <RoutineList />
      <button className="add-routine" onClick={this.addRoutine}>Add +</button>
    </div>)
  }

}
  
  export default inject("userManager","routineManager")(observer(Routine))