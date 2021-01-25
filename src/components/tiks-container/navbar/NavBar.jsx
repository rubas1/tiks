import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { fade,makeStyles } from '@material-ui/core/styles';
import HomeOutlinedIcon from  '@material-ui/icons/HomeOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import UpdateOutlined from '@material-ui/icons/UpdateOutlined'
const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center'
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    padding: theme.spacing(1),
    borderRadius: '10px!important',
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    width: theme.spacing(6),
    color: '#f6d365',
    height: theme.spacing(6),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

const NavBar = () =>  {
  const classes = useStyles();
    return(
      <div className={classes.paper}>
      <AppBar position="static">
        <Toolbar>
         <Grid container spacing={2}>
            <Grid item xs={3} sm={3}>
              <Link to="/home" className="link">
               <Avatar variant="square" className={classes.avatar}>
                <HomeOutlinedIcon className={classes.icon}/>
              </Avatar>
            </Link>
            </Grid>
            <Grid item xs={3} sm={3}>
            <Link to="/letsplan" className="link">
                <Avatar variant="square" className={classes.avatar}>
                <PostAddOutlinedIcon className={classes.icon}/>
              </Avatar>
              </Link>
            </Grid>
            <Grid item xs={3} sm={3}>
            <Link to="/routine" className="link">
            <Avatar variant="square" className={classes.avatar}>
                <UpdateOutlined className={classes.icon}/>
              </Avatar>
            </Link>
            </Grid>
            <Grid item xs={3} sm={3}>
            <Link to="/report" className="link">
            <Avatar variant="square" className={classes.avatar}>
                <AssessmentOutlinedIcon className={classes.icon}/>
              </Avatar>
            </Link>
            </Grid>
        </Grid>
     </Toolbar>
     </AppBar>

     </div>
    )
}
export default NavBar;