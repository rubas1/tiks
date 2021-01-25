const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: String,
    location: {
        lat: Number,
        lng: Number
    },
    startTime: String,
    endTime: String,
    priority: Number,
    completed: Boolean
})

const Task = mongoose.model("TaskModel", taskSchema)
module.exports = Task
