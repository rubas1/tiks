import React, {Component} from 'react';
import List from '@material-ui/core/List';
import { observer,inject } from 'mobx-react'
import RoutineView from './RoutineView'

class RoutineList extends Component {


  render() {
    let routines = this.props.routineManager.routines
    return (<div className="routines-list">
        <List> {routines.map((r,index) => <RoutineView key={index} routine={r}/>)} </List>
      </div>
    )
  }
}
  
export default inject("userManager","routineManager")(observer(RoutineList))

// {}