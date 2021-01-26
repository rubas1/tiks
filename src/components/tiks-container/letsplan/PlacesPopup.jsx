import React from 'react';
import PlacesList from './PlacesList'
import { observer,inject } from 'mobx-react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  modal: {
    display:'absolute',
    marginTop: '5%',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80vw',
      height: '90vh',
      overflow:'scroll',
      backgroundColor: 'white'
  },
  root: {
    display:'absolute',
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center'
  },
}));

const PlacesPopup = inject("mapManager","taskManager","userManager")
(observer((props) => {
  const classes = useStyles();

  const closePopup = () => {
    props.mapManager.showPlacesPopup = false
    props.mapManager.nearPlaces = []
  }

    return(
       <Modal 
       disablePortal
       disableEnforceFocus
       disableAutoFocus
       aria-labelledby="places-view"
       aria-describedby="places-view-description"
       className={classes.modal}
       open={props.mapManager.showPlacesPopup}
       onClose={closePopup}
       closeAfterTransition
        >
 <Fade in={props.mapManager.showPlacesPopup}>
   <div className={classes.root}>
   {props.mapManager.nearPlaces.map((p,i) => <PlacesList key={i} place={p}/>)}
   </div>
       </Fade>
       </Modal>)
  
}))
  
export default PlacesPopup;