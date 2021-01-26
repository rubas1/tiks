import React,{useState} from 'react';
import { observer,inject } from 'mobx-react'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import AddTask from '../letsplan/AddTask';

const useStyles = makeStyles((theme) => ({
  modal: {
      marginTop: '10%',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '80vw',
      height: '90vh',
      backgroundColor: 'color'
  }
}));

const TaskPopup =  inject("taskManager")
(observer((props) => {
  const classes = useStyles();
  const handleClose = () => {

    props.taskManager.updatingTask = false
  };
  
    return (
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        aria-labelledby="update-view"
        aria-describedby="update-description"
        className={classes.modal}
        open={props.taskManager.updatingTask}
        onClose={handleClose}
        closeAfterTransition
>
    <Fade in={props.taskManager.updatingTask}>
      <AddTask />
    </Fade>
  </Modal>
      )
    })) 
  
  export default TaskPopup;