import { observable, makeObservable, action,computed } from 'mobx'
import Task  from './Task'
import axios from 'axios'

export default class TaskManager
{
    constructor()
    {
        this.tasks = []
        this.temporaryTasks = []
        this.taskInput = {
            title: "",
            place: "",
            startTime: new Date(),
            endTime: new Date(),
            priority: ""
        }

        makeObservable(this, {
            tasks: observable,
            temporaryTasks: observable,
            addTemporaryTask: action,
            deleteTemporaryTask: action,
            getTasks: action,
            taskCompleted: action,
            deleteTask: action,
            updateTask: action,
            submitTasks: action,
            numTasks: computed
        })
    }

    addTemporaryTask = () =>
    {
        let task = new Task(this.taskInput.title,this.taskInput.place,this.taskInput.startTime,this.taskInput.endTime,this.taskInput.priority)
        let checkTask = this.temporaryTasks.find(t => t.title === task.title)
        checkTask?
        alert("task title already exist, please enter another title.")
        :
        this.temporaryTasks.push(task)
    }

    deleteTemporaryTask = (title) =>
    {
        let taskIndex = this.temporaryTasks.findIndex(t => t.title === title)
        this.temporaryTasks.splice(taskIndex,1)
    }

    getTasks = async (username,date) =>
    {
        
        let response = await axios.get(`http://localhost:${process.env.PORT}/userTasksPerDay/${username}/${date}`)
        this.tasks = response.data
    }

    taskCompleted = async (username,date,taskID) =>
    {
        
        await axios.put(`http://localhost:${process.env.PORT}/completeTask`,{username,date,taskID})
    }

    deleteTask = async (username,date,taskID) =>
    {
        
        await axios.delete(`http://localhost:${process.env.PORT}/deleteUserTask`,{username,date,taskID})
    }

    updateTask = async (username,date,taskID,property,value) =>
    {
        await axios.put(`http://localhost:${process.env.PORT}/updateTask`,{username,date,taskID,property,value})
    }

    submitTasks = async (username,date) =>
    {
        let response = await axios.post(`http://localhost:${process.env.PORT}/submitUserTasks`,{username,date,taksArray: this.temporaryTasks})
        console.log(response.data)
        this.temporaryTasks = []

    }
    get numTasks()
    {
        return this.temporaryTasks.length
    }

}