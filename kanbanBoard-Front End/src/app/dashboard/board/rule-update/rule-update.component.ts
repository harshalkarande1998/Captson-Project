
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/classes/board';
import { Rule } from 'src/app/classes/rule';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { IdGeneratorService } from 'src/app/services/id-generator.service';
import { RuleTransferService } from 'src/app/services/rule-transfer.service';

@Component({
  selector: 'app-rule-update',
  templateUrl: './rule-update.component.html',
  styleUrls: ['./rule-update.component.css']
})
export class RuleUpdateComponent implements OnInit {
  //vriable declaration
  ruleTriggerValue: any
  isRuleTriggerchanged:Boolean=false;
  isFromColumnChanged:Boolean=false;
  isToColumnChanged:Boolean=false;
  isTriggerStatusChanged:Boolean=false;
  isRuleDeleted:Boolean=false;




  // Constructor
  constructor(
    private dataTransferService: DataTransferService,
    private ruleTransfer: RuleTransferService,
    private matDialog: MatDialog,
    private idGen: IdGeneratorService) { }


  //ngOnInit Method
  ngOnInit(): void {
  }


  //take board and rule object from data transfer service and stored in variable 
  board: Board = this.dataTransferService.board as Board;
  rules: Rule[] = this.board?.boardRules;
  lengthOfRules:Number=this.board?.boardRules.length;

//initializing lengthOfRule variable
  



  //Get values of form for update the rule
  ruleForm: FormGroup = new FormGroup({
    // id of from column
    "fromColumn": new FormControl("", Validators.required),
    //id of to column
    "toColumn": new FormControl("", Validators.required),
    // the property used as trigger to move task(eg. priority/ completion status)
    "trigger": new FormControl("", Validators.required),
    //the status of the trigger upon which the rule will be applied
    "triggerStatus": new FormControl("")
  })



//getter method for ruturning the trigger value
  get trigger() {
    return this.ruleForm.get("trigger");
  }



  // method for updating rule
  updateRule(newRule: any, oldRule: Rule) {

    console.log("onchange method is working")
    console.log("old rule is printing")
    // console.log(oldRule)
    for (let existingRule of this.rules) {
      if (oldRule == existingRule) {
        console.log("assigning new values inside if ")
        if(!this.isRuleTriggerchanged){
          this.setTriggerValue(oldRule);
          console.log("before"+oldRule.trigger)
          oldRule.trigger=this.ruleTriggerValue;
          console.log("after"+oldRule.trigger)
        }else{
          oldRule.trigger=newRule.trigger
        }

        if(!this.isFromColumnChanged)
        {
          oldRule.fromColumn=oldRule.fromColumn;
        }else{
          oldRule.fromColumn=newRule.fromColumn;
        }

        if(!this.isToColumnChanged)
        {
          oldRule.toColumn=oldRule.toColumn;
        }else{
          oldRule.toColumn=newRule.toColumn;
        }

        if(!this.isTriggerStatusChanged)
        {
          oldRule.triggerStatus=oldRule.triggerStatus;
        }else{
          oldRule.triggerStatus=newRule.triggerStatus;
        }  
      }
    }
//assigning false value to boolean variable
    this.isRuleTriggerchanged=false;
    this.isFromColumnChanged=false;
    this.isToColumnChanged=false;
    this.closeDialog();

  }

// manually set trigger value
  setTriggerValue(oldRule:Rule){
    if (oldRule.trigger == 'taskCompletionStatus') {
      this.ruleTriggerValue = 'taskCompletionStatus';
      console.log(this.ruleTriggerValue)
    } else if (oldRule.trigger == 'taskStatus') {
      this.ruleTriggerValue = 'taskStatus';
      console.log(this.ruleTriggerValue)
    } else if (oldRule.trigger == 'taskPriority') {
      this.ruleTriggerValue = 'taskPriority';
      console.log(this.ruleTriggerValue)
    }
  }


  //checking for the channge in update form if any change happen this methods get called
  onChangeTrigger(){
    console.log("calling onchange method")
    this.isRuleTriggerchanged=true;
  }

  onChangeFromColumn(){
    this.isFromColumnChanged=true;
  }

  onChangeToColumn(){
    this.isToColumnChanged=true;
  }

  onChangeTriggerStatus(){
    this.isTriggerStatusChanged=true;
  }

  closeDialog() {
    this.matDialog.closeAll()
  }




  //Task delete
  deleteTask(rule:Rule){
    this.rules=this.rules.filter(r=>r!=rule)
    this.board.boardRules=this.rules;
  
  }

}
