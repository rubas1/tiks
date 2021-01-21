const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tasksSchema = new Schema({
    date: String,
    tasks: [{type: Schema.Types.ObjectId, ref: 'TaskModel'}]
})

const Tasks = mongoose.model("TasksModel", tasksSchema)
module.exports = Tasks
