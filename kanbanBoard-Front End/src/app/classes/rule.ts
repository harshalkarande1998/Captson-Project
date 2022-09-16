export class Rule {
    ruleId!:number
    // id of from column
    fromColumn!:number
    //id of to column
    toColumn!:number
    // the property used as trigger to move task(eg. priority/ completion status)
    trigger!:string
    //the status of the trigger upon which the rule will be applied
    triggerStatus!:string
}
