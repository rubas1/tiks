const express = require('express')
const router = express.Router()
const Routine = require('./models/routineSchema')
const Tasks = require('./models/tasksSchema')
const Task = require('./models/taskSchema')
const User = require('./models/userSchema')
const urllib = require('urllib')
const apiKey = 'AIzaSyDLv6Zg_G1WuzvGeZ1VwhlEbYdYtk4vGSQ'

//API ROUTES
router.post('/nearPlacesByCategory', function(request, response){
    let lat = request.body.lat
    let lng = request.body.lng
    let category = request.body.category
    let radius = request.body.radius
    console.log(lat +" "+ lng +" "+ category +" "+ radius)
    urllib.request(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${category}&key=${apiKey}`, function(err, result){
    response.send(JSON.parse(result.toString()).results)
    })
})

// DATABASE ROUTES
router.post('/userSignUp', function(request, response){
    let params = request.body
    let user = new User({username: params.username, password: params.password, name: params.name, surname: params.surname})
    user.save()
    response.send("Profile created successfuly")
})

router.post('/userSignIn', function(request, response){
    let params = request.body
    console.log(params)
    User.find({username: params.username}, function(err, user){
        if(user[0]){
            if(user[0].password === params.password){
                response.send(user[0])
            }else{
                response.send("Login Failed")
            }
        }else{
            response.send("user not exist")
        }
    })
})

router.post('/userTasksPerDay', function(request, response){
    let username = request.body.username
    let date = request.body.date
    User.findOne({username: username}).populate({
        path: 'allTasks',
        match: {date: date},
        populate:{
            path: 'tasks',
        }
    }).exec(function(err, user){
        if(!user.allTasks[0] || !user.allTasks[0].tasks){
            response.send("No tasks for this day")
        }else{
            response.send([user.allTasks[0].tasks, user.allTasks[0].date])
        }
    })
})

router.post('/deleteUserTask', function(request, response){
    let username = request.body.username
    let date = request.body.date
    let taskID = request.body.taskID
    User.findOne({username: username}).populate({
        path: 'allTasks',
        match: {date: date},
        populate:{
            path: 'tasks',
            match: {_id: taskID}
        }
    }).exec(function (err, user) {
        user.allTasks[0].tasks[0].remove(function (err){
            if(err === null){
                if(user.allTasks[0].tasks === []){
                    user.allTasks[0].ramove(function(err){
                        user.allTasks.save()
                        response.send("removed")
                    })
                }
                else{
                    user.allTasks[0].save()
                    response.send("removed")
                }
            }else{
                console.log("removing failed - " + err)
                response.send("failed to remove")
            }
        })
    })
})

router.put('/completeTask', function(request, response){
    let username = request.body.username
    let date = request.body.date
    let taskID = request.body.taskID
    User.findOne({username: username}).populate({
        path: 'allTasks',
        match: {date: date},
        populate:{
            path: 'tasks',
            match: {_id: taskID}
        }
    }).exec(function (err, user){
        user.allTasks[0].tasks[0].completed = !user.allTasks[0].tasks[0].completed
        user.allTasks[0].tasks[0].save()
    })
    response.send("task completed")
})

router.post('/userRoutine', function(request, response){
    let username = request.body.username
    let routineParams = request.body.routine
    let routine = new Routine({title: routineParams.title, location: routineParams.location, startTime: routineParams.startTime,endTime: routineParams.endTime, days: routineParams.days})
    routine.save()
    User.find({username: username}, function(err, user){
        if(!user){
            response.send("User not found")
        }else{
            user[0].routines.push(routine)
            user[0].save()
            response.send("Routine added successfuly")
        }
    })
})

router.get('/userRoutines/:username', function(request, response){
    let username = request.params.username
    User.findOne({username: username}).populate('routines').exec(function (err, user){
        console.log('im here')
        response.send(user.routines)
    })
})

router.post('/deleteUserRoutine', function(request, response){
    let username = request.body.username
    let routineID = request.body.routineID
    console.log(username)
    User.findOne({username: username}).populate({
        path: 'routines',
        match: {_id: routineID},
    }).exec(function (err, user){
        user.routines[0].remove()
        user.save()
        response.send("Routine removed successfuly")
    })

})

router.post('/submitUserTasks', function(request, response){
    let username = request.body.username
    let tasksArr = request.body.tasksArray
    let date = request.body.date
    User.findOne({username: username}).populate({
        path: 'allTasks',
        match: {date: date},
        populate:{
                path: 'tasks',
            }
    }).exec(function(err, user){
        if(!user.allTasks[0]){
            let newTasks = new Tasks({date: date})
            newTasks.save().then(function(){
                Tasks.findOne({date: date}).populate('tasks').exec(function(err, allTasks){
                    tasksArr.forEach(t => {
                        let task = new Task({title: t.title, location: {lat: t.location.lat, lng: t.location.lng}, startTime: t.startTime,endTime: t.endTime, priority: t.priority, completed: false})
                        task.save()
                        allTasks.tasks.push(task)
                    })
                    allTasks.save()
                    user.allTasks.push(allTasks)
                    user.save()
                })
            })
        }else{ 
            tasksArr.forEach(t => {
                let task = new Task({title: t.title, location: {lat: t.location.lat, lng: t.location.lng}, startTime: t.startTime,endTime: t.endTime, priority: t.priority, completed: false})
                task.save()
                user.allTasks[0].tasks.push(task)
            })
            user.allTasks[0].save()
        }
        response.send("tasks added")
    })
})

router.post('/UpdateTask', function(request, response){
    let username = request.body.username
    let date = request.body.date
    let taskID = request.body.taskID
    let newTask = request.body.task
    User.findOne({username: username}).populate({
        path: 'allTasks',
        match: {date: date},
        populate:{
            path: 'tasks',
            match: {_id: taskID}
        }
    }).exec(function (err, user){
        user.allTasks[0].tasks[0].title = newTask.title
        user.allTasks[0].tasks[0].location = newTask.location
        user.allTasks[0].tasks[0].startTime = newTask.startTime
        user.allTasks[0].tasks[0].endTime = newTask.endTime
        user.allTasks[0].tasks[0].priority = newTask.priority
        user.allTasks[0].tasks[0].save()
    })
    response.send("updated")
})

module.exports = router