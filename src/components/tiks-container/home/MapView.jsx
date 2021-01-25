import React,{useState} from 'react';
import { observer,inject } from 'mobx-react'
import GoogleMapReact from 'google-map-react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

const apiKey = 'AIzaSyDLv6Zg_G1WuzvGeZ1VwhlEbYdYtk4vGSQ'

const AnyReactComponent = ({ text }) => <div>{text}</div>

const useStyles = makeStyles((theme) => ({
  modal: {
    marginTop: '5%',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
      height: '80%',
  },
}));
const MapView =  inject("mapManager")
(observer((props) => {
  const classes = useStyles();

  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }
  
  const handleApiLoaded = (map, maps) => {
    // use map and maps objects
  }

  const handleClose = () => {

    props.mapManager.closeMap()
  };
  
    return (
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.modal}
        open={props.mapManager.mapOpened}
        onClose={handleClose}
        closeAfterTransition

>
  <Fade in={props.mapManager.mapOpened}>
  <GoogleMapReact
    bootstrapURLKeys={{ key: 'AIzaSyAtY7Se0K0cqw4t-kUwASAwFbFZADSaLkQ'}}
    defaultCenter={defaultProps.center}
    defaultZoom={defaultProps.zoom}
    yesIWantToUseGoogleMapApiInternals
  >
    <AnyReactComponent
      lat={59.955413}
      lng={30.337844}
      text="My Marker"
    />
  </GoogleMapReact>
        </Fade>
  </Modal>
      )
    })) 
  
  export default MapView;