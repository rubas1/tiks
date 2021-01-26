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
        this.routineInput = new Routine(null,"","",new Date(),new Date(),[])

        makeObservable(this, {
          routines: observable,
          routineInput: observable,
          days: observable,
          addRoutine: action,
          handleInput: action,
          getRoutines: action,
          deleteRoutine: action,
          addDay: action

        })
    }

    handleInput(event)
    {
        const {name,value} = event.target
        console.log(event.target)
        this[name] = value
    }

    getRoutines = async (username) =>{
        let response = await axios.get(`http://localhost:${PORT}/userRoutines/${username}`)
        this.routineInput = new Routine(null,"","",new Date(),new Date(),[])
        this.days = []
        this.routines = response.data
        console.log(response.data)
    }

    addRoutine = async (username) =>{
        let startTime = (this.routineInput.startTime).toString().slice(16,21)
        let endTime = (this.routineInput.endTime).toString().slice(16,21)
        this.routineInput.days = [...this.days]
        console.log(this.routineInput.days)
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