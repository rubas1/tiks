import React, {Component} from 'react';
import { observer,inject } from 'mobx-react'


class PlaceDetails extends Component {

  choosePlace = () =>{
      alert(`'${this.props.place.name}' chosen for task '${this.props.taskManager.taskInput.title}'`)
      this.props.taskManager.taskInput.location = this.props.place.location
      this.closeDetails()
      this.props.closePopup()
  }

  closeDetails = () => this.props.hidePlace()

  render() {
      let place = this.props.place
    return(<div className="place-div">
      <p>{place.name}</p>
      <img src={place.imgUrl} width="300" height="300"></img>
      {place.opened ? <p>Open Now</p> : <p>Closed Now</p>}
      <p>Location: {/*should add a click opens a map and shows the location of the place*/}</p>
      <p>Rating: {place.rating}</p>
      <button className="close" onClick={this.closeDetails}>X</button>
      <br></br>
      <button className="choose-place" onClick={this.choosePlace}>add place</button>
    </div>)
  }
}
  
export default inject("taskManager","mapManager")(observer(PlaceDetails));