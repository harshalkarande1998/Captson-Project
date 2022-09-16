import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/classes/board';
import { BackendRegistrationService } from 'src/app/services/backend-registration.service';
import { BoardTransferService } from 'src/app/services/board-transfer.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-add-new-board-popup',
  templateUrl: './add-new-board-popup.component.html',
  styleUrls: ['./add-new-board-popup.component.css']
})
export class AddNewBoardPopupComponent implements OnInit {


  // ********* Contructor **************
  constructor(
    private boardTransfer:BoardTransferService, 
    private matDialog:MatDialog, 
    private idGen:IdGeneratorService,
    private snackbarService:SnackbarService
    
    ) { }





  boardToBeAdded:FormGroup=new FormGroup({
    "boardName": new FormControl("", Validators.required),
    "boardDescription": new FormControl("", Validators.required),
    "availableTaskStatus": new FormControl(["on-track","at-risk","in-backlog"]),
    "availableTaskPriority": new FormControl(["low", "medium", "high"]),
    "boardRules": new FormControl([]),
    "boardMembers": new FormControl([
                                      {"memberEmail":sessionStorage.getItem('email'),
                                      //test@email.com
                                      "memberAccessLevel":"admin"}
                                    ]),
  
  "columns":new FormControl([])
})
  ngOnInit(): void {
  }
  createBoard(newBoard:Board)
  {
    // newBoard.boardId=1
    
    // ensure that the first letter are caps and rest are small for each word
    let toFormat:string[]=newBoard.boardName.split(" ");
    let formattedName:string = "";
    for(let word of toFormat)
    {
      formattedName += word.charAt(0).toUpperCase() + word.substring(1).toLowerCase()
    }
    newBoard.boardName= formattedName
    console.log(newBoard);
    this.idGen.getId().subscribe({
      next:id=>{newBoard.boardId=id as number
        this.boardTransfer.addNewBoard(newBoard)
        this.closeDialogAddBoard()
      }
    })
  
  }
  closeDialogAddBoard()
  {
    this.matDialog.closeAll()
  }
} 
