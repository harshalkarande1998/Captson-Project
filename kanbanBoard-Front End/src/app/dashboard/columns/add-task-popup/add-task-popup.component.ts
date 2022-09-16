import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from 'src/app/classes/board';
import { Column } from 'src/app/classes/column';
import { Task } from 'src/app/classes/task';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';

@Component({
  selector: 'app-add-task-popup',
  templateUrl: './add-task-popup.component.html',
  styleUrls: ['./add-task-popup.component.css']
})
export class AddTaskPopupComponent implements OnInit {


  column:Column | undefined
  constructor(private dataTransfer:DataTransferService, private matDialog:MatDialog,
    private idGen:IdGeneratorService) {
   }

   board:Board |undefined=this.dataTransfer.board

  ngOnInit(): void {
    console.log("this is the column :" +this.column)
  }

  newTask:FormGroup=new FormGroup({
    "taskName":new FormControl("", Validators.required),
    "taskDescription": new FormControl("", Validators.required),
    "taskStatus": new FormControl("", Validators.required),
    "taskPriority": new FormControl("", Validators.required),
    "taskAssignedTo":new FormControl("", Validators.required),
    "dueDate":new FormControl("", Validators.required)
  })


  createTask(taskData:Task){
 
    // taskData.taskId = 1
    taskData.taskCompletionStatus=false
    this.idGen.getId().subscribe({
      next:id=>{taskData.taskId=id as number
        taskData.dueDate=new Date(taskData.dueDate)
        this.dataTransfer.addTask(taskData)
        console.log(typeof taskData.dueDate);
        this.closeDialogAddTask();
      }
    })
   
   

  }

  closeDialogAddTask(){
    this.matDialog.closeAll();
  }

  minStartDate=new Date()

  


  

}
