const mongoose = require('mongoose')
const Schema = mongoose.Schema

const routineSchema = new Schema({
    title: String,
    location: {
        lat: Number,
        lng: Number
    },
    startTime: String,
    endTime: String,
    days: [Number]
})

const Routine = mongoose.model("RoutineModel", routineSchema)
module.exports = Routine
