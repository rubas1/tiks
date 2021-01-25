import {observable, makeObservable, action, computed} from 'mobx'
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
            id: null,
            title: "",
            location: {
                lat: 0,
                lng: 0
            },
            startTime: new Date(),
            endTime: new Date(),
            priority: 3
        }
        this.updatingTask = false

        makeObservable(this, {
            currentDate: observable,
            taskInput: observable,
            tasks: observable,
            temporaryTasks: observable,
            updatingTask: observable,
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

    SortByPriority = (tasks) => {
        return tasks.sort(function(a, b) {
          if (a.priority < b.priority) return 1;
          if (a.priority > b.priority) return -1;
          return 0;
        })
      }

    updateCurrentTask = async (username) => {
        let startTime = (this.taskInput.startTime).toString().slice(16,21)
        let endTime = (this.taskInput.endTime).toString().slice(16,21)
        let newTask={
            title: this.taskInput.title,
            location: this.taskInput.location,
            startTime: startTime,
            endTime : endTime,
            priority: this.taskInput.priority
        }
        let response = await axios.post(`http://localhost:${PORT}/UpdateTask`,{username, date: this.currentDate,taskID: this.taskInput.id, task: newTask})
        this.getTasks(username, this.currentDate)
    }

    resetTaskInput = () => {
        this.taskInput = {
            id: null,
            title: "",
            location: {
                lat: 0,
                lng: 0
            },
            startTime: new Date(),
            endTime: new Date(),
            priority: 3
        }
    }

    addTemporaryTask = () =>
    {
        if(this.taskInput.title === ""){
            alert("Task title can't be empty")
        }else{
            let startTime = (this.taskInput.startTime).toString().slice(16,21)
            let endTime = (this.taskInput.endTime).toString().slice(16,21)
            let task = new Task(null,this.taskInput.title, this.taskInput.location, startTime, endTime, this.taskInput.priority, false)
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
            this.tasks = []
            return "No tasks for this day"
        }else{
            this.tasks = []
            let sortedArr = this.SortByPriority(response.data[0])
            console.log(sortedArr)
            sortedArr.forEach(t =>{
                let newTask = new Task(t._id, t.title, t.location, t.startTime, t.endTime, t.priority, t.completed)
                this.tasks.push(newTask)
            })
            this.currentDate = response.data[1]
            return("Tasks up-to date")
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