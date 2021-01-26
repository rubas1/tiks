import React, {useEffect} from 'react';
import { observer,inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    alignContent: 'center',
    alignItems: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },

}));

const HeaderDate =  inject("userManager","taskManager")
(observer((props) => {
  const classes = useStyles();
  const inputHandler = (e) =>{
    props.taskManager.currentDate = e.target.value
  }

  const getTasks = () =>{
    let username = props.userManager.username
    let res = props.taskManager.getTasks(username)
    res.then((result) => {
      if(result === "No tasks for this day"){
        alert(result)
      }
    })
  }
  useEffect(() => {
    (async () => {
      getTasks()
    })()
  }, [props.taskManager.currentDate])

    console.log(props.userManager.name)
    let name = props.userManager.name
    console.log(props.taskManager.currentDate)

    return(
    <Container className={classes.container}>
      <div className="user-welcome">
        <h3>Welcome Back, {name}</h3>
        <h5>Let's Organize Your Day</h5>
        </div>
        <div className="date-picker">
          <TextField
        id="date"
        name="day"
        label="Pick Planning Date"
        type="date"
        defaultValue={props.taskManager.currentDate}
        onChange={inputHandler}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
       </div>
     </Container>
    )
}))
  
export default HeaderDate;