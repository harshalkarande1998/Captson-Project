import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/classes/column';
import { Email } from 'src/app/classes/email';
import { Task } from 'src/app/classes/task';
import { ColumnTransferService } from 'src/app/services/column-transfer.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { EmailNotificationService } from 'src/app/services/email-notification.service';
import { AddTaskPopupComponent } from './add-task-popup/add-task-popup.component';
import { UpdateColumnPopupComponent } from './update-column-popup/update-column-popup.component';

@Component({
  selector: 'app-column',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.css']
})
export class ColumnsComponent implements OnInit {



  email: Email = new Email;
  constructor(private matDialog:MatDialog, private taskTransfer:DataTransferService,
    private emailService:EmailNotificationService, private columnTransfer:ColumnTransferService) { 
    // this.checkTaskLimit()
   }

  ngOnInit(): void {
    this.checkTaskLimit()
   
  }

  @Input()
  column!:Column
  
  @Output()
  columnChanges:EventEmitter<Column> = new EventEmitter()

  @Output()
  isColumnDeleted:EventEmitter<boolean>= new EventEmitter()

  shouldDeleteColumn:boolean=false;

  @Input()
  shouldDisplayMyTask!:boolean

  @Input()
  taskPriorityFilter!:string
  
  userEmail:string = sessionStorage.getItem('email') as string;
  editColumn()
  {
    this.columnTransfer.addColumn(this.column)
    this.matDialog.open(UpdateColumnPopupComponent).afterClosed().subscribe(val=>{
      this.updateColumn()
    })
  }

  updateColumn(){
    if(this.columnTransfer.isAdded)
    {
      let updatedColumn = this.columnTransfer.getColumn()
      this.columnTransfer.isAdded=false
      this.column=updatedColumn;
      this.updateBoard()
    }

  }

  deleteColumn()
  {
    this.shouldDeleteColumn=true
    this.isColumnDeleted.emit(this.shouldDeleteColumn)
  }
  isLimitExceeded:boolean = false

  updateBoard()
  {
    this.checkTaskLimit()
    this.columnChanges.emit(this.column);
  }

  openAddTaskPopup(){
    this.matDialog.open(AddTaskPopupComponent).afterClosed().subscribe(res=>{
      this.addTask()
    })
  }

  addTask(){
    // this.column.columnTitle="changed column"
    let newTask= this.taskTransfer.getTask()
    if(this.taskTransfer.isTaskAdded)
    {
      this.column.tasks.push(newTask)
      this.taskTransfer.isTaskAdded=false
    }
    this.updateBoard()

    this.email.recipient=newTask.taskAssignedTo
    this.email.subject="New Task Assigned"
    this.email.msgBody="A New Task has been assigned to you" + "."
    + "\n" + "link: http://localhost:4200/dashboard"
    this.email.attachment= "src/main/resources/logo.png"
    this.emailService.sendNotifications(this.email).subscribe({
      next: res=>{
        console.log("notified");
        
      }
    })
  }



  deleteTask(isTaskDeleted:boolean, task:Task){
    if(isTaskDeleted)
    {
      this.column.tasks=this.column.tasks.filter(t=>t!=task)
      this.updateBoard()
    }
  }
  updateTaskChange(taskNew:Task, taskOld:Task)
  {
    console.log("updating task change");
    
    for(let taskVal of this.column.tasks)
    {
      if(taskVal==taskOld)
      {
        taskVal = taskNew
      }
    }
    console.log(this.column);
    this.updateBoard()
  }

  checkTaskLimit()
  {
    if(this.column.columnTaskLimit<this.column.tasks.length)
    {
        this.isLimitExceeded=true
    }

  }
  
  drop(event:CdkDragDrop<Task[]>){
    if(event.previousContainer != event.container){
      transferArrayItem(event.previousContainer.data,event.container.data,
        event.previousIndex,event.currentIndex)
    }else{
      moveItemInArray(this.column.tasks,event.previousIndex, event.currentIndex)

    }

   this.updateBoard();
  }

}
