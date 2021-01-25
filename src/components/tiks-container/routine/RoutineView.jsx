import React, {Component} from 'react';
import  {useLocation, Link} from "react-router-dom";
import { observer,inject } from 'mobx-react'

const RoutineView = inject("userManager","taskManager","routineManager")(observer((props) => {
    let routine = props.routine
    let username = props.userManager.username

    const updateRoutine = () => console.log("update routine")
   
     const deleteRoutine = () => props.routineManager.deleteRoutine(username, routine.id)
   
    return(<div className="routine-div">
        <h4>{routine.title}</h4>
        <button className="delete" onClick={deleteRoutine}>delete</button>
        <button className="update" onClick={deleteRoutine}>update</button>
    </div>)
   }))
   
   export default RoutineView