import React,{useState} from 'react';
import { observer,inject } from 'mobx-react'
import GoogleMapReact from 'google-map-react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import RoomOutlinedIcon from '@material-ui/icons/Room';

const apiKey = 'AIzaSyDLv6Zg_G1WuzvGeZ1VwhlEbYdYtk4vGSQ'

const AnyReactComponent = () => <RoomOutlinedIcon style={{color:"blue"}}/>
const useStyles = makeStyles((theme) => ({
  modal: {
    marginTop: '5%',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80%',
      height: '80%',
  },
}));
const MapView =  inject("mapManager","taskManager")
(observer((props) => {
  const classes = useStyles();
  
  const defaultProps = {
    center: {
      lat: props.taskManager.tasks[0].location.lat || 32.0853,
      lng: props.taskManager.tasks[0].location.lng || 34.7818
    },
    zoom: 12
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
    {props.taskManager.tasks.map(t =>
     {
       if(t.location)
       {
        return(
          <AnyReactComponent
          lat = {t.location.lat}
          lng = {t.location.lng}
          />
            )
       }

    })
    }
  
  </GoogleMapReact>
        </Fade>
  </Modal>
      )
    })) 
  
  export default MapView;