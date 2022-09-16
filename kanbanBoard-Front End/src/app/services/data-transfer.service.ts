import { Injectable } from '@angular/core';
import { Board } from '../classes/board';
import { Task } from '../classes/task';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  board : Board | undefined
  task!:Task
  isTaskAdded:boolean = false

  constructor() { }

  getBoard(board:Board){
    return this.board=board;
  }

  addTask(task:Task)
  {
    this.task=task
    this.isTaskAdded=true
  }
  getTask()
  {
    return this.task
  }
}
