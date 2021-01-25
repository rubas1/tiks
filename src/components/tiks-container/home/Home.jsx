import React, {Component} from 'react';
import HeaderDate from './HeaderDate';
import MapView from './MapView';
import TasksView from './TasksView';
import { observer,inject } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'

class Home extends Component {

  openHomeMap = () => this.props.mapManager.openMap()

  render() {
    return(<div className="home">
      <HeaderDate />
      <FontAwesomeIcon icon={faMap} size="10x" onClick={this.openHomeMap} color="green"/>
      {console.log(this.props.mapManager.mapOpened)}
       {this.props.mapManager.mapOpened ? <MapView /> : null}
     <TasksView /> 
    </div>)
  }
}
  
export default inject("mapManager","userManager","taskManager")(observer(Home));