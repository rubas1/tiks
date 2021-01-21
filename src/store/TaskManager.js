import { observable, makeObservable, action,computed } from 'mobx'
import Task  from './Task'
import axios from 'axios'
const PORT = 8080

export default class TaskManager
{
    constructor()
    {
        this.tasks = []
        this.temporaryTasks = {
            date: JSON.stringify(new Date()).slice(1,11),
            tasksList: []
        }
        this.currentDate = JSON.stringify(new Date()).slice(1,11)
        this.taskInput = {
            title: "",
            place: "",
            startTime: new Date(),
            endTime: new Date(),
            priority: 1
        }
        this.currentTask ={
            id: null,
            title: "",
            place: "",
            startTime: new Date(),
            endTime: new Date(),
            priority: "",
            taskUpdateInput:{
                proprety: "",
                value: ""
            }
        }

        makeObservable(this, {
            currentDate: observable,
            currentTask: observable,
            taskInput: observable,
            tasks: observable,
            temporaryTasks: observable,
            addTemporaryTask: action,
            deleteTemporaryTask: action,
            getTasks: action,
            taskCompleted: action,
            deleteTask: action,
            updateTask: action,
            submitTasks: action,
            updateCurrentTask: action,
            numTasks: computed
        })
    }

    updateCurrentTask = (task) => {
        this.currentTask.id = task.id
        this.currentTask.title = task.title
        this.currentTask.place = task.place
        this.currentTask.startTime = task.startTime
        this.currentTask.endTime = task.endTime
        this.currentTask.priority = task.priority
        this.taskUpdateInput.property = ""
        this.taskUpdateInput.value = ""
    }

    addTemporaryTask = () =>
    {
        if(this.taskInput.title === ""){
            alert("Task title can't be empty")
        }else{
            let task = new Task(this.taskInput.title,this.taskInput.place,this.taskInput.startTime,this.taskInput.endTime,this.taskInput.priority)
            let checkTask = this.temporaryTasks.tasksList.find(t => t.title === task.title)
            checkTask ? alert("task title already exist, please enter another title.") : this.temporaryTasks.tasksList.push(task)
            console.log(this.temporaryTasks.tasksList)
        }
    }

    deleteTemporaryTask = (title) =>
    {
        let taskIndex = this.temporaryTasks.tasksList.findIndex(t => t.title === title)
        this.temporaryTasks.tasksList.splice(taskIndex,1)
    }

    getTasks = async (username) =>
    {
        let response = await axios.post(`http://localhost:${PORT}/userTasksPerDay`,{username, date: this.currentDate})
        if(response.data === "No tasks for this day" || !response.data[0][0]){
            alert("No tasks for this day" )
        }else{
            this.tasks = response.data[0]
            this.currentDate = response.data[1]
        }
    }

    taskCompleted = async (username,taskID) =>
    {
        
        await axios.put(`http://localhost:${PORT}/completeTask`,{username,date: this.currentDate,taskID})
        this.getTasks(username, this.currentDate)
    }

    deleteTask = async (username,taskID) =>
    {
        
        await axios.post(`http://localhost:${PORT}/deleteUserTask`,{username,date: this.currentDate ,taskID})
        this.getTasks(username, this.currentDate)
    }

    updateTask = async (username,taskID,property,value) =>
    {
        await axios.put(`http://localhost:${PORT}/updateTask`,{username,date: this.currentDate,taskID,property,value})
        this.getTasks(username, this.currentDate)
    }

    submitTasks = async (username) =>
    {
        console.log(this.temporaryTasks.date)
        let response = await axios.post(`http://localhost:${PORT}/submitUserTasks`,{username,date: this.temporaryTasks.date, tasksArray: this.temporaryTasks.tasksList})
        console.log(response.data)
        this.temporaryTasks.tasksList = []
    }

    get numTasks()
    {
        return this.temporaryTasks.tasksList.length
    }

}