import { Task } from "./task"

export class Column {
    columnId!:number
    columnTitle!:string
    columnTaskLimit!:number
    tasks!:Task[]
}
