import React, {Component} from 'react';
import { observer,inject } from 'mobx-react'
import PlaceDetails from './PlaceDetails'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';


const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  details: {
    margin: theme.spacing(1),
    display: 'grid',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  accord:{
    backgroundColor: theme.palette.primary.main,
    color: 'white'
  }
}));
const PlacesList = inject("mapManager","taskManager","userManager")
(observer((props) => {

  const classes = useStyles();

    let place = props.place
    const choosePlace = () =>{
      alert(`'${props.place.name}' chosen for task '${props.taskManager.taskInput.title}'`)
      props.taskManager.taskInput.location = props.place.location
      props.mapManager.showPlacesPopup = false
  }
    return(
            <Accordion >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.accord}
            >
              <Typography className={classes.heading}>
                {place.name}
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <Grid>
              <TextField
              id="status"
              label="Place Status"
              name="status"
              fullWidth
              value={place.opened?'Open Now':'Closed Now'}
            />
              </Grid>
              <Grid>
              <TextField
              id="rating"
              label="Rating"
              name="rating"
              fullWidth
              value={place.rating || 'None'}
            />
              </Grid>
              <Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ fontSize: 10 }}
                onClick={choosePlace}
                  >
          Add Place
        </Button>
              </Grid>
            </AccordionDetails>
          </Accordion>
    )
  
}))
  
export default PlacesList;