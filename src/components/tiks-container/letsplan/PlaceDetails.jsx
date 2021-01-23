import React, {Component} from 'react';
import { observer,inject } from 'mobx-react'


class PlaceDetails extends Component {

  choosePlace = () =>{
      //this function should add the current place to the task
  }

  closeDetails = () => this.props.hidePlace()

  render() {
      let place = this.props.place
    return(<div className="place-div" onClick={this.choosePlace}>
      <p>{place.name}</p>
      <img src={place.imgUrl} width="300" height="300"></img>
      {place.opened ? <p>Open Now</p> : <p>Closed Now</p>}
      <p>Location: {/*should add a click opens a map and shows the location of the place*/}</p>
      <p>Rating: {place.rating}</p>
      <button className="close" onClick={this.closeDetails}>X</button>
    </div>)
  }
}
  
export default inject("mapManager")(observer(PlaceDetails));