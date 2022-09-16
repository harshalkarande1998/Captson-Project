import { Column } from "./column";
import { Member } from "./member";
import { Rule } from "./rule";

export class Board {
    boardId!:number
    boardName!:string
    boardDescription!:string
    availableTaskStatus!:string[]
    availableTaskPriority!:string[];
    boardRules!:Rule[];
    columns!:Column[];
    boardMembers!:Member[];

}
