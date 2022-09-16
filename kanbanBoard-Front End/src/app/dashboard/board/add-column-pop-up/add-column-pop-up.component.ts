import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Column } from 'src/app/classes/column';
import { ColumnTransferService } from 'src/app/services/column-transfer.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { ColumnsComponent } from '../../columns/columns.component';

@Component({
  selector: 'app-add-column-pop-up',
  templateUrl: './add-column-pop-up.component.html',
  styleUrls: ['./add-column-pop-up.component.css']
})
export class AddColumnPopUpComponent implements OnInit {

  // taskLimitNeeded!:boolean 

  newColumn:FormGroup= new FormGroup({
    "columnTitle": new FormControl("", Validators.required),
    "taskLimitNeeded": new FormControl(false),
    "columnTaskLimit": new FormControl(1, [Validators.min(1)])
  })
  constructor(private matDialogRef:MatDialog, private columnTransfer: ColumnTransferService,
    private idGen:IdGeneratorService) { 

  }
  get taskLimitNeeded(){
    return this.newColumn.get("taskLimitNeeded");
  }

  submitColumn(column:Column)
  {
    // column.columnId=1
    this.idGen.getId().subscribe({
      next:id=>{column.columnId=id as number
      
        column.tasks=[]
        if(!this.newColumn.value.taskLimitNeeded)
          column.columnTaskLimit = 0
        console.log(column);
        this.columnTransfer.addColumn(column)
        this.closeDialog() 
      }
      
    })
    //moved from here to inside subscribe
  }
  closeDialog(){
    this.matDialogRef.closeAll()
  }

  ngOnInit(): void {
  }


}
