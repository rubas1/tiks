import React, {Component} from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import { observer,inject } from 'mobx-react'
import Container from '@material-ui/core/Container';
import PlacesPopup from './PlacesPopup'

class LetsPlan extends Component {
  render() {
    return (
    <Container style={{backgroundColor: 'white'}} className="lets-plan">
      <AddTask />
      {this.props.taskManager.updatingTask ? null : <TaskList />}
      {this.props.mapManager.showPlacesPopup ? <PlacesPopup /> : null}
    </Container>)
  }
}
  
  export default inject("userManager","taskManager","mapManager")(observer(LetsPlan));