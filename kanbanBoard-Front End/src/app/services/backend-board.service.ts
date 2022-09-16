import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from '../classes/board';
import { BackendRegistrationService } from './backend-registration.service';

@Injectable({
  providedIn: 'root'
})
export class BackendBoardService {

  userEmail:string = sessionStorage.getItem("email") as string;
  userToken:string = sessionStorage.getItem("token") as string;

  constructor(private httpClient:HttpClient, private loggedIn:BackendRegistrationService) { }

  userUrl:string = "http://localhost:9000/user/board/"
  boardUrl:string = "http://localhost:9000/boards/"
  
  getUserBoards():Observable<number[]>
  {
    return this.httpClient.get<number[]>
    (
      this.userUrl+"all/"+this.userEmail,
      {
        headers:
        {
         "Authorization": "Bearer "+this.userToken
        }
      }
    
     );
    
  }

  getBoardById(boardId:number): Observable<Board>
  {
    return this.httpClient.get<Board>
    (
      this.boardUrl+"getBoard/"+this.userEmail+"/"+boardId,

      {
        headers:
        {
         "Authorization": "Bearer "+this.userToken
        }
      }
      
    )
  }

  addNewBoard(board:Board)
  {
    return this.httpClient.post
    (
      this.boardUrl+"addBoard/"+this.userEmail,
      board,
      {
        headers:
        {
        "Authorization": "Bearer "+this.userToken
        }
      }
    )
  }


  updateBoard(board:Board)
  {
    console.log(this.userToken)
    return this.httpClient.put
    (
      this.boardUrl+"updateBoard/"+this.userEmail,
      board,
      {
        headers:
        {
          "Authorization": "Bearer "+this.userToken
        }
      }
    )
  }
  deleteBoardById(boardId:number)
  {
    return this.httpClient.delete
    (
      this.boardUrl+"deleteBoard/"+this.userEmail+"/"+boardId,
      {
        headers:
        {
          "Authorization": "Bearer " + this.userToken
        }
      }
    )
  }
  deleteBoardFromUser(boardId:number,email:string){
    return this.httpClient.delete
    (this.userUrl+"deleteBoard/"+email+"/"+boardId,
    {
      headers:
      {
        "Authorization": "Bearer " + this.userToken
      }
    }
    )
  }
  addBoardUser(boardId:number, email:string){
    
    return this.httpClient.put
    (
      this.userUrl+"addBoard/"+email+"/"+boardId,{},
      {
        headers:
        {
          "Authorization": "Bearer " + this.userToken
        }
      }
    )
  }


  getUserDetails()
  {
    return this.httpClient.get(this.userUrl+"getUserDetails/"+this.userEmail,
    {
      headers:
      {
        "Authorization": "Bearer " + this.userToken
      }
    }
    )
  }

}




