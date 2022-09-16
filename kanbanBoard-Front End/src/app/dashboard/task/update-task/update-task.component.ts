import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/classes/board';
import { Email } from 'src/app/classes/email';
import { Member } from 'src/app/classes/member';
import { Task } from 'src/app/classes/task';
import { BoardTransferService } from 'src/app/services/board-transfer.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { EmailNotificationService } from 'src/app/services/email-notification.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  task!: Task
  board: Board |undefined
  checkAdmin()
   {
    let adminEmail:string="";
    
    for( let member of this.board?.boardMembers as Member[])
    {
      if(member.memberAccessLevel=="admin")
      {
        adminEmail=member.memberEmail
      }
    }
    return sessionStorage.getItem("email")==adminEmail
   }
  minStartDate=new Date()
  updateTaskForm!:FormGroup
  constructor(
    private dataTransferService: DataTransferService,
    private matDialog: MatDialog,
    private emailService:EmailNotificationService
  ) {
    // this.task = this.dataTransferService.getTask();
    this.getTask();
    this.updateTaskForm=new FormGroup({
     
      "taskAssignedTo":new FormControl(this.task.taskAssignedTo),
      "taskPriority": new FormControl(this.task.taskPriority),
      "taskStatus":new FormControl(this.task.taskStatus),
      "dueDate": new FormControl(this.task.dueDate)
    })
    this.board=dataTransferService.board;
    
  }


  updateTask()
  {

    let shouldSendMail:boolean = this.task.taskAssignedTo != this.updateTaskForm.get("taskAssignedTo")?.value
    this.task.taskName = document.getElementById("taskName")?.innerText as string
    this.task.taskDescription=document.getElementById("taskDescription")?.innerText as string
    this.task.taskAssignedTo = this.updateTaskForm.get("taskAssignedTo")?.value
    this.task.taskPriority = this.updateTaskForm.get("taskPriority")?.value
    this.task.taskStatus = this.updateTaskForm.get("taskStatus")?.value
    console.log(this.updateTaskForm.get("dueDate"));
    
    this.task.dueDate = new Date(this.updateTaskForm.get("dueDate")?.value)


    // this.task.taskAssignedTo=document.getElementById("taskAssignedTo")?.innerText as string
    // this.task.taskPriority=document.getElementById("taskPriority")?.innerText as string
    // this.task.taskStatus=document.getElementById("taskStatus")?.innerText as string
    // this.task.dueDate=new Date(document.getElementById("dueDate")?.innerText as string)
    // this.task.taskPriority=document.getElementById("taskPriority")?.innerText as string

    console.log(this.task);
    this.dataTransferService.addTask(this.task)
    if(shouldSendMail)
      {
      let email:Email = {
        "recipient":this.task.taskAssignedTo,
        "subject": "Task assigned",
        "msgBody" : "A New Task has been assigned to you" + "."
    + "\n" + "link: http://localhost:4200/dashboard",
    "attachment": "src/main/resources/logo.png"
      }
      this.emailService.sendNotifications(email).subscribe({
        next: res=>{
          console.log("notified");
          
        },
        error:err=>{
          console.log(err);
          
        }
      })
    }
    this.closeUpdateTaskDialog()
  }

  closeUpdateTaskDialog(){
    this.matDialog.closeAll()
  }

  getTask(){
    this.task = this.dataTransferService.getTask();
    this.dataTransferService.isTaskAdded=false
  }

  ngOnInit(): void {
    
    
  }

  /********************************* */


}
