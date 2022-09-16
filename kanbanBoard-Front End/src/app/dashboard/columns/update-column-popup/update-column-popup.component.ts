import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Column } from 'src/app/classes/column';
import { ColumnTransferService } from 'src/app/services/column-transfer.service';

@Component({
  selector: 'app-update-column-popup',
  templateUrl: './update-column-popup.component.html',
  styleUrls: ['./update-column-popup.component.css']
})
export class UpdateColumnPopupComponent implements OnInit {
  column!:Column
  newColumn!:FormGroup
  taskLimit!:boolean 
  constructor(private columnTransfer:ColumnTransferService,private matDialog:MatDialog) {
    this.column = columnTransfer.getColumn()
    columnTransfer.isAdded=false
    this.taskLimit= this.column.columnTaskLimit>0?true:false
    this.newColumn=new FormGroup({
      "columnTitle": new FormControl(this.column.columnTitle),
      "taskLimitNeeded": new FormControl(this.taskLimit),
      "columnTaskLimit": new FormControl(this.column.columnTaskLimit, [Validators.min(1)])
    })
   }
   get taskLimitNeeded(){
    return this.newColumn.get("taskLimitNeeded");
  }
   updateColumn()
   {
      this.column.columnTitle=this.newColumn?.get("columnTitle")?.value as string
      if(this.taskLimitNeeded?.value as boolean)
        this.column.columnTaskLimit=this.newColumn?.get("columnTaskLimit")?.value as number
      else{
        this.column.columnTaskLimit = 0
      }
      console.log(this.column);
      this.columnTransfer.addColumn(this.column)
      this.closeDialog()
   }
   closeDialog()
   {
    this.matDialog.closeAll()

   }
  ngOnInit(): void {
  }

}
