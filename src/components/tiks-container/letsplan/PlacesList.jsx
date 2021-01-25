import React, {Component} from 'react';
import { observer,inject } from 'mobx-react'
import PlaceDetails from './PlaceDetails'

class PlacesList extends Component {
  constructor(){
    super()
    this.state={
      showPlace: false
    }
  }

  displayPlace = () =>{
    this.setState({showPlace: true})
  }

  hidePlace = () =>{
    this.setState({showPlace: false})
  }

  render() {
    let place = this.props.place

    return(<div>
      <div className="places-list">
        {this.state.showPlace ? <PlaceDetails place={place} hidePlace={this.hidePlace} closePopup={this.props.closePopup}/> : <p onDoubleClick={this.displayPlace}>{place.name} </p>}
        </div>
      </div>
    )
  }
}
  
export default inject("mapManager")(observer(PlacesList));