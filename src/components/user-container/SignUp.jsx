import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));


const SignUp = inject("userManager")
(observer((props) => { 

  const classes = useStyles();

  const [profileCreated, setProfileCreated] = useState(false);
    
    
  const handleUsernameInput = (event) =>{
    props.userManager.username = event.target.value
  }

  const handlePasswordInput = (event) =>{
    props.userManager.password = event.target.value
  }

  const handleNameInput = (event) =>{
    props.userManager.name = event.target.value
  }

  const handleSurnameInput = (event) =>{
    props.userManager.surname = event.target.value
  }

  const signUp = () => {

    let response = props.userManager.userSignUp()
    response.then((result) => {
      result = "Profile created successfuly"
      if(result === "Profile created successfuly"){
        setProfileCreated(true)
      }
    })
  }

    return(
      <div>
       {profileCreated? <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <Link to="/" style={{textDecoration: 'none'}}>Click Here To Go To Sign In</Link>
          </Button>
          :
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar} >
          <AssignmentTurnedInOutlinedIcon style={{ fontSize: 40 }}/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fName"
                name="name"
                variant="outlined"
                required
                value={props.userManager.name}
                onChange={handleNameInput}
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={props.userManager.surname}
                onChange={handleSurnameInput}
                id="surname"
                label="Surname"
                name="surname"
                autoComplete="sName"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                value={props.userManager.username}
                onChange={handleUsernameInput}
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={props.userManager.password}
                onChange={handlePasswordInput}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I accept agreement of terms & privacy"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={signUp}
          >
            Sign Up
          </Button>
            <Link to="/" style={{textDecoration: 'none'}}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ fontSize: 10 }}
            className={classes.submit}
          >
            Already Have An Account? Click Here To Sign In
          </Button>
              </Link>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
       }
               
      </div>
    )
}))
  
export default SignUp;