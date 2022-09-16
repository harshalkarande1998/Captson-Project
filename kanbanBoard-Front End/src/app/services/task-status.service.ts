import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusService {


  newTaskStatus!:string
  isTaskStatusAdded:boolean=false

  addNewTaskStatus(status:string)
  {
    this.newTaskStatus=status;
    this.isTaskStatusAdded=true
  }
  getTaskStatus()
  {
    return this.newTaskStatus
    
  }


  constructor() { }
}
