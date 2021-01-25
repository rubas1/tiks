import { observable, makeObservable } from 'mobx'
import  Task  from './Task'

export default class Routine{

  constructor(id,title,location,startTime,endTime){
    this.id = id
    this.title = title
    this.location = location
    this.startTime = startTime
    this.endTime = endTime
    this.days = []

    makeObservable(this, {
      id: observable,
      days: observable,
      title: observable,
      location: observable,
      startTime: observable,
      endTime: observable,
    })
  }
}
