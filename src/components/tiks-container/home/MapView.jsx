import React, {Component} from 'react';
import { observer,inject } from 'mobx-react'
import GoogleMapReact from 'google-map-react';
import '../../../style/mapPopUp.css'
const apiKey = 'AIzaSyDLv6Zg_G1WuzvGeZ1VwhlEbYdYtk4vGSQ'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class MapView extends Component {

  handleApiLoaded  (map, maps) {
    // use map and maps objects
  }
  
  closeMapView = () => this.props.mapManager.closeMap()
  render() {
    return (
      <div  className="map-popup" >
      <div className="map-popup-inner">
        <div width='20%' onClick={this.closeMapView}>X</div>
  <GoogleMapReact
    bootstrapURLKeys={{ key: 'AIzaSyAtY7Se0K0cqw4t-kUwASAwFbFZADSaLkQ'}}
    defaultCenter={this.props.center}
    defaultZoom={this.props.zoom}
    yesIWantToUseGoogleMapApiInternals
    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
      
  >
    <AnyReactComponent
      lat={59.955413}
      lng={30.337844}
      text="My Marker"
    />
  </GoogleMapReact>
              
  </div>
    </div>
      )
  }

  // render() {
  //   return (
  //   <div  className="map-popup" >
  //     <div className="map-popup-inner">
  //       <div width='20%' onClick={this.closeMapView}>X
  //       </div>
  //       <GoogleMapReact bootstrapURLKeys={{key: apiKey}} defaultCenter={this.props.center} defaultZoom={this.props.zoom} yesIWantToUseGoogleMapApiInternals onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)} >
  //         <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
  //       </GoogleMapReact>
  //     </div>
  //   </div>)
  // }
}
  
  export default inject("mapManager","taskManager")(observer(MapView));