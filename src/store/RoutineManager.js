import { observable, makeObservable, action } from 'mobx'
import  Routine  from './Routine'
import axios from 'axios'
const PORT = 8080

export default class RoutineManager
{
    constructor()
    {
        this.routines = []
        this.days = []
        this.routineInput = new Routine(null,"","",new Date(),new Date())
        makeObservable(this, {
          routines: observable,
          routineInput: observable,
          days: observable,
          addRoutine: action,
          getRoutines: action,
          deleteRoutine: action,
          addDay: action

        })
    }


    getRoutines = async (username) =>{
        let response = await axios.get(`http://localhost:${PORT}/userRoutines/${username}`)
        this.routines = response.data
    }

    addRoutine = async (username) =>{
        let startTime = (this.routineInput.startTime).toString().slice(16,21)
        let endTime = (this.routineInput.endTime).toString().slice(16,21)
        let routine = new Routine(null,this.routineInput.title,this.routineInput.location,startTime,endTime,this.routineInput.days)
        let response = await axios.post(`http://localhost:${PORT}/userRoutine`,{username,routine})
        this.getRoutines(username)
    }

    deleteRoutine = async (username, id) =>{
        let response = await axios.post(`http://localhost:${PORT}/deleteUserRoutine`,{username, routineID: id})
        this.getRoutines(username)
    }

    addDay = (day) => {
        this.days = day
        
    }

}