import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'src/app/classes/member';
import { MemberTransferService } from 'src/app/services/member-transfer.service';

@Component({
  selector: 'app-add-members',
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent implements OnInit {

  member:FormGroup = new FormGroup({
    "memberEmail": new FormControl("", [Validators.required,Validators.pattern("^[a-zA-Z0-9_.-]+[@][a-z]+[.][a-zA-Z0-9.-]+$")]),
    "memberAccessLevel":new FormControl("user")
  })
  constructor(private matDialog:MatDialog, private memTransfer:MemberTransferService) { }

  ngOnInit(): void {
  }
  addMember(memberVal:Member)
  {
      this.memTransfer.addNewMember(memberVal)
      this.closeAddMemberDialog()
  }
  closeAddMemberDialog(){
    this.matDialog.closeAll()
  }

}
