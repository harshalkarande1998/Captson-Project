import { Injectable } from '@angular/core';
import { Rule } from '../classes/rule';

@Injectable({
  providedIn: 'root'
})
export class RuleTransferService {
  newRule!:Rule
  isRuleAdded:boolean = false
  constructor() { }
  addNewRule(rule:Rule)
  {
    this.newRule=rule
    this.isRuleAdded=true
  }
  getRule()
  {
    return this.newRule
  }
}
