export class Task {
    taskId!:number
    taskName!:string
    taskDescription!:string
    taskImage!:string
    // is the task completed or not
    taskCompletionStatus!:boolean
    // status of task from list of available task statuses
    taskStatus!:string
    // priority of task from list of available priorities
    taskPriority!:string
    //email id of the member the task is assigned to
    taskAssignedTo!:string
    dueDate!:Date
}
