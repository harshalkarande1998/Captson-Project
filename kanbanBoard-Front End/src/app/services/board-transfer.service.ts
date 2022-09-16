import { Injectable } from '@angular/core';
import { Board } from '../classes/board';

@Injectable({
  providedIn: 'root'
})
export class BoardTransferService {
  isBoardAdded:boolean=false;
  newBoard!:Board

  constructor() { }

  
   addNewBoard(boardToBeAdded:Board)
    {
      this.newBoard = boardToBeAdded;
      this.isBoardAdded=true
    }
    getNewBoard()
    {
      return this.newBoard
    }
}
