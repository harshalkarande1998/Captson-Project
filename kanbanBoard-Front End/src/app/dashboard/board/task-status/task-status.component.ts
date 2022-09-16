import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskStatusService } from 'src/app/services/task-status.service';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.css']
})
export class TaskStatusComponent implements OnInit {



  taskstatus1:FormGroup=new FormGroup({
    "taskstatus":new FormControl("")
  })


  closeTaskStatusDialog(){
    this.matdialog.closeAll()
  }

  addTaskStatus(status:string){
  
    this.taskstatusservice.addNewTaskStatus(status);
    console.log(status);
    
    this.closeTaskStatusDialog()
  }

  constructor(private matdialog:MatDialog, private taskstatusservice:TaskStatusService) { }

  ngOnInit(): void {
  }

}
