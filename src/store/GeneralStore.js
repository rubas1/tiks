import { observable, makeObservable, action ,toJS } from 'mobx'
import TaskManager from './TaskManager'
import RoutineManager from './RoutineManager'
import Task from './Task'
import Routine from './Routine'
import UserManager from './UserManager'

export class GeneralStore
{
    constructor(){
        this.taskManager = new TaskManager()
        this.routineManager = new RoutineManager()
        this.userManager = new UserManager()
    // {   //task
    //     this.taskTitle = ""
    //     this.taskSearchBy = "place"
    //     this.taskPlace = ""
    //     this.taskPriority = 1
    //     this.openClockPopUp = false
    //     this.selectedClockOpener = ''
    //     this.startTime = new Date()
    //     this.endTime = new Date()
    //     this.day = new Date();
    //     this.openMap = false
        
    //     //routine
    //     this.dayPicked = []
    //     this.routineStartTime = new Date()
    //     this.routineEndTime = new Date()
    //     this.routineTitle = ''
    //     this.routineSearchBy = ''
    //     this.routinePlace = ''
        
        makeObservable(this, {
            taskManager: observable,
            routineManager: observable,
            userManager:observable,
            setEndTime: action,
            setStartTime: action,
            handleInput: action,
            changeMapState: action,
            changeTimeStatus: action,
            setSelectedClockOpener: action,
            setRoutineStartTime: action,
            setRoutineEndTime: action
        })
    }

    handleInput(event)
    {
        const {name,value} = event.target
        console.log(event.target)
        this[name] = value
    }

    changeMapState = (value) =>
    {
        this.openMap = value
    }

    changeTimeStatus(time,name)
    {
        console.log(name)
        this[name] = time
    }

    changeTimeState(value)
    {
        this.openClockPopUp = value
        console.log(toJS(this.startTime),toJS(this.endTime))
    }

    setSelectedClockOpener(value)
    {
        this.selectedClockOpener = value
        this.changeTimeState(true)
    }

    setStartTime(date)
    {
        this.startTime = date
    }

    setEndTime(date)
    {
        this.endTime = date
    }

    setDayPicked(day)
    {
        this.dayPicked = day
    }

    setRoutineStartTime(date)
    {
        this.routineStartTime = date
    }
    setRoutineEndTime(date)
    {
        this.routineEndTime = date
    }
}