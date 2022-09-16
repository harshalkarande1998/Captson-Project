import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/classes/board';
import { Email } from 'src/app/classes/email';
import { Task } from 'src/app/classes/task';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { EmailNotificationService } from 'src/app/services/email-notification.service';
import { UpdateTaskComponent } from './update-task/update-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit,OnChanges {

  @Input()
  task!:Task

  @Output()
  changedTask:EventEmitter<Task> = new EventEmitter()

  shouldDeleteTask:boolean=false;
  @Output()
  deletedTask:EventEmitter<boolean>= new EventEmitter()

  statusColor!:string;
  todaysDate:Date= new Date;
  dateColor!:string;
  toolTip!:string;


  deleteTaskFromColumn()
  {
    this.deletedTask.emit(this.shouldDeleteTask);
  }
  // call this method whenever there is a change in the task value
  deleteTask()
  {
    this.shouldDeleteTask=true;
    this.deleteTaskFromColumn()
  }
  updateColumn()
  {
    this.changedTask.emit(this.task)
  }

  changeTaskStatus()
  {
    this.task.taskStatus="changing"
    this.updateColumn()
  }

  changeTaskCompletionStatus()
  {
    this.task.taskCompletionStatus = !this.task.taskCompletionStatus;
    this.statusColorChanger()
    this.updateColumn();
  }

  
  changeTaskPriority()
  {
    let priority = this.task.taskPriority;
    if(priority=="low")
      this.task.taskPriority= "high"
    else
      this.task.taskPriority="low"
  }

  constructor(private matDialog:MatDialog, private taskTransfer:DataTransferService, private emailService:EmailNotificationService) { 
  

  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  openEditTaskDialog()
  {
    //add the task editor popup here
    this.taskTransfer.addTask(this.task)
    this.matDialog.open(UpdateTaskComponent).afterClosed().subscribe(res=>{
      this.updateTask()
    })
    
  }
  updateTask()
  {
    let updatedTask = this.taskTransfer.getTask()
    console.log(updatedTask);
    
    if(this.taskTransfer.isTaskAdded)
    {
      this.task = updatedTask
      this.taskTransfer.isTaskAdded=false
      console.log(this.task);
      this.dateColorChanger();
      this.updateColumn()
    
    }
   
  }
  ngOnInit(): void {
    this.task.dueDate=new Date(this.task.dueDate);
    this.statusColorChanger();
    this.dateColorChanger();
  }

statusColorChanger(){
  if(this.task.taskCompletionStatus)
  {
    this.statusColor="color: green; opacity: 100%";
  }
  else{
    this.statusColor=""
  }
}



dateColorChanger(){
 if(this.task.dueDate<new Date(this.todaysDate.toISOString().split("T")[0]))
  {
    this.dateColor="color:red; opacity:100%";
    this.toolTip="Deadline Exceeded";
  }else if(this.task.dueDate.toISOString().split("T")[0]==this.todaysDate.toISOString().split("T")[0])
  {
    this.dateColor="color:orange; opacity:100%";
    this.toolTip="Today is Deadline"
  }
  else {
    this.dateColor="";
  }
}






}





