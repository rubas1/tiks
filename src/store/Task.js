import { observable, makeObservable } from 'mobx'

export default class Task
{
    constructor(id,title,location,startTime,endTime,priority,completed)
    {
        this.id = id
        this.title = title
        this.location = location
        this.startTime = startTime
        this.endTime = endTime
        this.priority = priority
        this.completed = completed

        makeObservable(this, {
            id: observable,
            title: observable,
            location: observable,
            startTime: observable,
            endTime: observable,
            priority: observable,
            completed: observable
    
        })
    }

}
