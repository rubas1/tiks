import { observable, makeObservable, action,computed } from 'mobx'
import Task  from './Task'
import axios from 'axios'

export default class TaskManager
{
    constructor()
    {
        this.tasks = []
        
        this.temporaryTasks = {
            date: new Date(),
            tasksList: []
        }

        this.currentDate = ""
        this.taskInput = {
            title: "",
            place: "",
            startTime: "",
            endTime: "",
            priority: ""
        }
        this.currentTask ={
            id: null,
            title: "",
            place: "",
            startTime: "",
            endTime: "",
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
        let checkTask = this.temporaryTasks.tasksList.find(t => t.title === task.title)
        checkTask?
        alert("task title already exist, please enter another title.")
        :
        this.temporaryTasks.tasksList.push(task)
    }

    deleteTemporaryTask = (title) =>
    {
        let taskIndex = this.temporaryTasks.findIndex(t => t.title === title)
        this.temporaryTasks.tasksList.splice(taskIndex,1)
    }

    getTasks = async (username) =>
    {
        
        let response = await axios.get(`http://localhost:${process.env.PORT}/userTasksPerDay/${username}/${this.currentDate}`)
        this.tasks = response.data[0]
        this.currentDate = response.data[1]
    }

    taskCompleted = async (username,taskID) =>
    {
        
        await axios.put(`http://localhost:${process.env.PORT}/completeTask`,{username,date: this.currentDate,taskID})
        this.getTasks(username, this.currentDate)
    }

    deleteTask = async (username,taskID) =>
    {
        
        await axios.delete(`http://localhost:${process.env.PORT}/deleteUserTask`,{username,date: this.tasks.date,taskID})
        this.getTasks(username, this.currentDate)
    }

    updateTask = async (username,taskID,property,value) =>
    {
        await axios.put(`http://localhost:${process.env.PORT}/updateTask`,{username,date: this.currentTask,taskID,property,value})
        this.getTasks(username, this.currentDate)
    }

    submitTasks = async (username) =>
    {
        let response = await axios.post(`http://localhost:${process.env.PORT}/submitUserTasks`,{username,date: this.temporaryTasks.date,taksArray: this.temporaryTasks.tasksList})
        console.log(response.data)
        this.temporaryTasks.tasksList = []
    }

    get numTasks()
    {
        return this.temporaryTasks.tasksList.length
    }

}