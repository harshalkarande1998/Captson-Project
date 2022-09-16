import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/classes/board';
import { Column } from 'src/app/classes/column';
import { Email } from 'src/app/classes/email';
import { Member } from 'src/app/classes/member';
import { Rule } from 'src/app/classes/rule';
import { BackendBoardService } from 'src/app/services/backend-board.service';
import { ColumnTransferService } from 'src/app/services/column-transfer.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { EmailNotificationService } from 'src/app/services/email-notification.service';
import { MemberTransferService } from 'src/app/services/member-transfer.service';
import { RuleTransferService } from 'src/app/services/rule-transfer.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TaskProrityTransferService } from 'src/app/services/task-prority-transfer.service';
import { TaskStatusService } from 'src/app/services/task-status.service';
import { AddColumnPopUpComponent } from './add-column-pop-up/add-column-pop-up.component';
import { AddMembersComponent } from './add-members/add-members.component';
import { RulePopUpComponent } from './rule-pop-up/rule-pop-up.component';
import { TaskPriorityComponent } from './task-priority/task-priority.component';
import { TaskStatusComponent } from './task-status/task-status.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input()
  boardObject!:Board
  @Output()
  updateBoard:EventEmitter<Board> = new EventEmitter()
  @Output()
  isBoardDeleted:EventEmitter<boolean> =  new EventEmitter()

  shouldDeleteBoard:boolean=false
  displayMyTask:boolean=false;
  chosenPriority:string = "";



  choosePriority(value:string)
  {
    if(this.chosenPriority==value)
    {
      this.removePriorityFilter()
      return
      // this.changePriorityFilter()
    }
    this.chosenPriority=value
  }
  removePriorityFilter()
  {
    this.chosenPriority="";
  }
  changeTaskDisplay()
  {
    this.displayMyTask=!this.displayMyTask
  }

  colocode=['red']
  
  updateBoardInDb()
  {
    this.updateBoard.emit(this.boardObject)
  }




  constructor(private matDialog:MatDialog, 
    private getColumn:ColumnTransferService, 
    private dataTransfer:DataTransferService, 
    private ruleTransfer:RuleTransferService,
    private userBoard:BackendBoardService, 
    private memberTransfer:MemberTransferService,
    private taskPriorityTransfer:TaskProrityTransferService,
    private taskStatusService:TaskStatusService,
    private emailService:EmailNotificationService,
    private snackbarService:SnackbarService,
    ) {
     
   }
  deleteMemberFromTasks(email:string)
  {
    for(let column of this.boardObject.columns)
    {
      for(let task of column.tasks)
      {
        if(task.taskAssignedTo==email)
        {
          task.taskAssignedTo=""
        }
      }
    }
    this.updateBoardInDb()
  }
   deleteMember(email:string)
   {
    if(this.checkAdmin() && window.confirm("Members may have been assigned with tasks. Are you sure?")){
    let isDeleted=false
    this.boardObject.boardMembers= this.boardObject.boardMembers.filter(member=>
      {
        
        if(member.memberEmail==email&&member.memberAccessLevel!="admin")
        {
          isDeleted=true
          return false
        }
        else if(member.memberEmail==email&&member.memberAccessLevel=="admin")
        {
          return true
        }
        else{
          return true
        }
      }
    )
    if(isDeleted)
      {
        this.userBoard.deleteBoardFromUser(this.boardObject.boardId,email).subscribe({
          next: val=>{
            // alert("member removed")
            this.snackbarService.openSnackBar("Member Removed","Dismiss")
            this.deleteMemberFromTasks(email)
          },
          error: err=>{
            // alert("not removed")
            this.snackbarService.openSnackBar("Member Not Removed","Dismiss")
          } 
        })
      }
    this.updateBoardInDb()
    }
    else{
      this.snackbarService.openSnackBar("Only admins can delete members","Dismiss")
    }
    // this.userBoard.deleteBoardFromUser()
   }
   addMember()
   {
      if(this.memberTransfer.isMemberAdded)
      {
        let newMember:Member = this.memberTransfer.getMember()
        for(let member of this.boardObject.boardMembers)
        {
          if(member.memberEmail==newMember.memberEmail)
          {
            this.snackbarService.openSnackBar("Member already exists", "Dismiss");
            this.memberTransfer.isMemberAdded=false;
            return
          }
        }
        // this.boardObject.boardMembers.push(newMember)
        // this.memberTransfer.isMemberAdded=false
        // this.updateBoardInDb()
        let email:Email={
          "recipient":newMember.memberEmail,
          "subject": "added to board",
          "msgBody": "You have been added to board "+this.boardObject.boardName+" by "+sessionStorage.getItem("email") + "."
          + "\n" + "link: http://localhost:4200/dashboard",
          "attachment":"src/main/resources/logo.png"
        }


        this.userBoard.addBoardUser(this.boardObject.boardId,newMember.memberEmail).subscribe({
          next:res=>{
            this.boardObject.boardMembers.push(newMember)
            this.memberTransfer.isMemberAdded=false
            this.updateBoardInDb()
            this.emailService.sendNotifications(email).subscribe({
              next:res=>{console.log("notification sent");
              }
            })
            // alert("member added to board")
            this.snackbarService.openSnackBar("Member has been added to Board","Dismiss")
          },
          error: err=>{
            // alert("user not registered as member")
            this.snackbarService.openSnackBar("This Email is not registered with HRS kanban board ","Dismiss")
            console.log(err);
            
          }
        })
      }
   }
   checkAdmin()
   {
    let adminEmail:string="";
    for( let member of this.boardObject.boardMembers)
    {
      if(member.memberAccessLevel=="admin")
      {
        adminEmail=member.memberEmail
      }
    }
    return sessionStorage.getItem("email")==adminEmail
   }
  
   deleteBoard()
   {
    // let adminEmail:string= this.getAdmin();

    if(!this.checkAdmin())
    {
      // alert("only admins can delete board")
      this.snackbarService.openSnackBar("Only Admin can Delete the board", "Dismiss")
    }
    if(this.checkAdmin() && window.confirm("This cannot be undone. Are you sure?"))
    {this.shouldDeleteBoard=true
    this.isBoardDeleted.emit(this.shouldDeleteBoard)}
   }

   deleteColumn(isColumnDeleted:boolean, column:Column)
   {
      if(isColumnDeleted)
      {
        this.boardObject.columns= this.boardObject.columns.filter(c=>c!=column)
        this.updateBoardInDb()
      }
   }

  updateColumn(columnNew:Column, columnOld:Column)
  {
    console.log(columnOld);
    console.log("updating board");
    
    for(let columnVal of this.boardObject.columns)
    {
      if(columnVal==columnOld)
      {
        columnVal=columnNew;
      }
    }
    this.applyRule()
    console.log(this.boardObject);
    this.updateBoardInDb()
  }

  addColumn(){
    let newColumn:Column = this.getColumn.getColumn()
    console.log(newColumn);
    if(this.getColumn.isAdded)
      {this.boardObject.columns.push(newColumn);
        this.getColumn.isAdded=false
      }
    this.updateBoardInDb()

  }

  openAddColumnDialog()
  {
    this.matDialog.open(AddColumnPopUpComponent).afterClosed()
    .subscribe(res=>this.addColumn())
  }

  openAddRuleDialog(){
    this.dataTransfer.board=this.boardObject
    this.matDialog.open(RulePopUpComponent).afterClosed().subscribe(res=>{
      
      this.addRule()
      
    })
  }

  addRule(){
    let newRule:Rule = this.ruleTransfer.getRule()
    if(this.ruleTransfer.isRuleAdded)
    {
      this.boardObject.boardRules.push(newRule)
      this.ruleTransfer.isRuleAdded=false
      this.applyRule()
      
    }
    console.log("*****************************");
    
    console.log(this.boardObject);
    // alert("adding and updating rule")
    
    this.updateBoardInDb()
  }

  applyRule()
  {
    for(let rule of this.boardObject.boardRules)
    {
      for(let column of this.boardObject.columns)
      {
        if(column.columnId==rule.fromColumn)
        {
          for(let task of column.tasks)
          {
          
            if(
              (rule.trigger=="taskCompletionStatus" && task.taskCompletionStatus.toString()==rule.triggerStatus)
              ||
              (rule.trigger=="taskPriority" && task.taskPriority==rule.triggerStatus)
              ||
              (rule.trigger=="taskStatus" && task.taskStatus==rule.triggerStatus)
              )
            {
                column.tasks  = column.tasks.filter(t=>t!=task);
                let toColumn= this.boardObject.columns.filter(c=>c.columnId==rule.toColumn)[0]
                toColumn.tasks.push(task);

            }
          }
        }
       
      }
    }
  }

  ngOnInit(): void {
   // this.dataTransfer.board=this.boardObject
     console.log(this.boardObject)
    this.dataTransfer.getBoard(this.boardObject)
    this.applyRule()
  }

  openAddMemberDialog(){
    this.matDialog.open(AddMembersComponent).afterClosed().subscribe(done=>{
      this.addMember()
    })
  }

  addTaskPriority(){
    if(this.taskPriorityTransfer.isTaskPriorityAdded){
      let newTaskPriority:string= this.taskPriorityTransfer.getTaskPriority()
      this.boardObject.availableTaskPriority.push(newTaskPriority)
      this.taskPriorityTransfer.isTaskPriorityAdded=false
      this.updateBoardInDb()
    }

   }
   deletePriorityFromTasks(priority:string)
   {
    for(let column of this.boardObject.columns)
    {
      for(let task of column.tasks)
      {
        if(task.taskPriority==priority)
        {
          task.taskPriority=""
        }
      }
    }
   }

   
   deleteTaskPriority(priority:string){
    if(this.chosenPriority==priority)
    {
      this.chosenPriority=""
    }
    this.deletePriorityFromTasks(priority)
    this.boardObject.availableTaskPriority=this.boardObject.availableTaskPriority.filter(taskPriority=>taskPriority!=priority)
    this.updateBoardInDb()
   }


   openTaskPriorityDialog()
  {
    this.matDialog.open(TaskPriorityComponent).afterClosed().subscribe(res=>{
      this.addTaskPriority()
    })
  }
 
  openTaskStatusDialog(){
    this.matDialog.open(TaskStatusComponent).afterClosed().subscribe(res=>{
      console.log(res);
      this.addTaskStatus()
    })
  }
  addTaskStatus(){
    if(this.taskStatusService.isTaskStatusAdded){
      let newTaskStatus:string=this.taskStatusService.getTaskStatus()
      this.boardObject.availableTaskStatus.push(newTaskStatus)
      this.taskStatusService.isTaskStatusAdded=false
      this.updateBoardInDb();
    }
   }
   deleteTaskStatus(taskStatus:string){
    this.deleteStatusFromTasks(taskStatus)
      this.boardObject.availableTaskStatus=this.boardObject.availableTaskStatus.filter(status=>status!=taskStatus)
      this.updateBoardInDb();
   }

   deleteStatusFromTasks(status:string)
   {
    for(let column of this.boardObject.columns)
    {
      for(let task of column.tasks)
      {
        if(task.taskStatus==status)
        {
          task.taskStatus=""
        }
      }
    }
   }
}
