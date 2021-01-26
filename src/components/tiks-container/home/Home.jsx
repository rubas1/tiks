import React from 'react';
import HeaderDate from './HeaderDate';
import MapView from './MapView';
import TasksView from './TasksView';
import TaskPopup from './TaskPopup';
import { observer,inject } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  mapColor: {
    color: theme.palette.primary.main,
  },
  home: {
    backgroundColor: 'white',
    width: '100vw',
  }

}));

const Home = inject("mapManager","userManager","taskManager")(observer((props) =>
  {
  const classes = useStyles();
  const openHomeMap = () => props.mapManager.openMap()

    return(<div className={classes.home}>
      <HeaderDate />
      <Tooltip title="Select Map View" interactive>
          <IconButton aria-label="Select Map View" onClick={openHomeMap} size="medium">
                <FontAwesomeIcon className={classes.mapColor} icon={faMap} size="6x"/>
          </IconButton> 
      </Tooltip>
       {props.mapManager.mapOpened ? <MapView /> : null}
       {props.taskManager.updatingTask?<TaskPopup/>: null}
     <TasksView /> 
    </div>)
  

}))
  
export default Home;

