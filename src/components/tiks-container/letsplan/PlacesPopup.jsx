import React, {Component} from 'react';
import PlacesList from './PlacesList'
import { observer,inject } from 'mobx-react'


class PlacesPopup extends Component {
  closePopup = () => this.props.mapManager.showPlacesPopup = false
  render() {
    return(<div className="places-container">
      {this.props.mapManager.nearPlaces.map(p => <PlacesList place={p} closePopup={this.closePopup}/>)}
      <button className="close" onClick={this.closePopup}>X</button>
    </div>)
  }
}
  
export default inject("mapManager")(observer(PlacesPopup));