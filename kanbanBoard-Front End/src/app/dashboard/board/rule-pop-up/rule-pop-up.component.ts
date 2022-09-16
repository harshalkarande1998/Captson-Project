import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/classes/board';
import { Rule } from 'src/app/classes/rule';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { RuleTransferService } from 'src/app/services/rule-transfer.service';

@Component({
  selector: 'app-rule-pop-up',
  templateUrl: './rule-pop-up.component.html',
  styleUrls: ['./rule-pop-up.component.css']
})
export class RulePopUpComponent implements OnInit {
  [x: string]: any;

  constructor(private dataTransferService:DataTransferService, private ruleTransfer:RuleTransferService,
    private matDialog:MatDialog, private idGen:IdGeneratorService) { }

  board:Board | undefined= this.dataTransferService.board;
  rules :Rule[] |undefined = this.board?.boardRules;

  ruleForm:FormGroup = new FormGroup({
    // id of from column
    "fromColumn": new FormControl("", Validators.required),
    //id of to column
    "toColumn": new FormControl("", Validators.required),
    // the property used as trigger to move task(eg. priority/ completion status)
    "trigger": new FormControl("", Validators.required),
    //the status of the trigger upon which the rule will be applied
    "triggerStatus": new FormControl("")
})




  get trigger()
  {
    return this.ruleForm.get("trigger");
  }




  addRule(rule:Rule)
  {
    // rule.ruleId=1;
    this.idGen.getId().subscribe({
      next:id=>{rule.ruleId=id as number
        this.ruleTransfer.addNewRule(rule)
        console.log(rule);
    
        if(rule!=undefined)
          {
          console.log(rule);}
          this.closeDialog()
      
      }
    })
   
  }

  ngOnInit(): void {
  }


  closeDialog(){
    this.matDialog.closeAll()
  }

}
