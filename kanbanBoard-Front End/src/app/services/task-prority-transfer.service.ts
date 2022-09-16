import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskProrityTransferService {


  newTaskPriority!:string
  isTaskPriorityAdded:boolean=false

  addNewTaskPriority(priority:string)
  {
    this.newTaskPriority=priority;
    this.isTaskPriorityAdded=true
  }
  getTaskPriority()
  {
    return this.newTaskPriority
    
  }
  constructor() { }
}
