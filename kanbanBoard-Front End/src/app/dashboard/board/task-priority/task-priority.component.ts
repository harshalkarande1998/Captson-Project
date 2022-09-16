import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskProrityTransferService } from 'src/app/services/task-prority-transfer.service';


@Component({
  selector: 'app-task-priority',
  templateUrl: './task-priority.component.html',
  styleUrls: ['./task-priority.component.css']
})
export class TaskPriorityComponent implements OnInit {


  taskpriority1:FormGroup= new FormGroup({
    "taskpriority":new FormControl("")
})

  constructor(private matdialog:MatDialog,private taskpriorityservice:TaskProrityTransferService) { }

  ngOnInit(): void {
  }

  closeTaskPriorityDialog(){
    this.matdialog.closeAll()
  }

  addTaskPriority(priority:string){
  
    this.taskpriorityservice.addNewTaskPriority(priority);
    console.log(priority);
    
    this.closeTaskPriorityDialog()
  }
}
