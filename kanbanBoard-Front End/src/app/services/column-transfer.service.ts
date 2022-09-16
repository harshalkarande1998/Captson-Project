import { Injectable } from '@angular/core';
import { Column } from '../classes/column';
import { BoardComponent } from '../dashboard/board/board.component';

@Injectable({
  providedIn: 'root'
})
export class ColumnTransferService {

  column!:Column
  isAdded:boolean = false
  constructor() { }
  addColumn(columnToBeAdded:Column)
{
  this.column= columnToBeAdded
  this.isAdded=true
 
}
  getColumn()
  {
    return this.column
  }
}
