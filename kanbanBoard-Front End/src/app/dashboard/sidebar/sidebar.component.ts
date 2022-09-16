import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getMatIconFailedToSanitizeUrlError } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Board } from 'src/app/classes/board';
import { BackendBoardService } from 'src/app/services/backend-board.service';
import { BackendRegistrationService } from 'src/app/services/backend-registration.service';
import { BoardTransferService } from 'src/app/services/board-transfer.service';
import { SidenavService } from '../../services/sidenav.service';
import { AddNewBoardPopupComponent } from '../add-new-board-popup/add-new-board-popup.component';
import { AddColumnPopUpComponent } from '../board/add-column-pop-up/add-column-pop-up.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import * as sock from "sockjs-client";
import * as stomp from "stompjs";
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ImageSaverService } from 'src/app/services/image-saver.service';
import { HttpStatusCode } from '@angular/common/http';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, AfterViewInit,OnChanges {


  stompClient!:stomp.Client
  user!:any;
  userImage:string ="../../../assets/profile.webp"


  getUserDetails()
  { this.backendService.getUserDetails().subscribe({
    next:userDetail=>{
      this.user = userDetail
      this.imageStore.getImage().subscribe(res=>{
        this.userImage=res.image
      })
    },
    error:err=>{
      console.log(err);
      
    }
  })
  }



  ngOnChanges(changes: SimpleChanges): void {
        if(this.shouldAdd)
        {
          this.addNewBoard()
        }
        if(this.shouldGoHome)
        {
          this.selectedBoard=undefined as unknown as Board
        }
  }

  @ViewChild('drawer')drawerDetails:MatDrawer | undefined
  
  boards:Board[]=[]
  selectedBoard!:Board
  constructor(private toolbarService:SidenavService, private backendService:BackendBoardService,
    private matDialog:MatDialog, private boardTransfer:BoardTransferService, private router:Router,
    private loginService:BackendRegistrationService, private snackbarService:SnackbarService,
    private imageStore:ImageSaverService) {
     this.getAllBoards()
     this.getUserDetails()
     
    // console.log(this.boards);
    // this.user = {
    //   "email": "test@user.com",
    //   "firstName": "test",
    //   "lastName": "user"
    // }
    // console.log("reloarding component");
    
  }




  refreshBoard(boardId:number)
  {
    console.log("refreshing");
    
    this.getBoardById(boardId)

  }



  getAllBoards()
  {
    let selectedBoardData =this.selectedBoard
     this.boards=[]
    this.backendService.getUserBoards().subscribe({
      next: val=>{
        for(let boardVal of val)
       { 
          this.getBoardById(boardVal)
      }
      if(selectedBoardData!=null||selectedBoardData!=undefined)
      {
        this.selectedBoard=selectedBoardData
      }
      },
      error: err=>{
        // alert("Internal error occurred")
        this.snackbarService.openSnackBar("Internal error occurred",'Dismiss')
        
      }
    
    })
  }

  getBoardById(boardVal:number)
  {
    this.backendService.getBoardById(boardVal).subscribe({
      next: boardData=>{
        let duplicate = false;
       
           
            this.boards = this.boards.map((boardElement)=>{if(boardElement.boardId==boardData.boardId){
              duplicate=true
              this.selectedBoard=boardData
              return boardData
            }
          else{
            return boardElement
          }})
         
        console.log(this.boards);
        if(!duplicate)
        {
          this.boards.push(boardData)
        }
      },
      error: err=>{
        // alert("The board was not found")
        this.snackbarService.openSnackBar("The board was not found",'Dismiss')
        this.selectedBoard=undefined as any as Board
        if(err.status==HttpStatusCode.Unauthorized)
        {
          this.getAllBoards()
        }
        console.log(err);
        
      }
    })
 
  }


  @Input()
  shouldAdd!:boolean
  @Input()
  shouldGoHome!:boolean

  @Output()
  changeDisplay:EventEmitter<boolean>= new EventEmitter()
  @Output()
  addStatus:EventEmitter<boolean> = new EventEmitter()

  changeAddStatus()
  {this.addStatus.emit(false)}



  changeDisplayToBoard()
  {
    this.changeDisplay.emit(false)
  }

  addNewBoard()
  {
      let newBoard:Board = this.boardTransfer.getNewBoard();
      console.log(newBoard);
      
      if(this.boardTransfer.isBoardAdded)
      {
        this.boards.push(newBoard);
        this.boardTransfer.isBoardAdded=false
        this.selectBoard(newBoard)
        this.changeAddStatus()
        this.backendService.addNewBoard(newBoard).subscribe({
          next: response=>{
        this.snackbarService.openSnackBar("New board added",'Dismiss')

            // alert("New board added")
            
          },
          error: err=>{
        this.snackbarService.openSnackBar("error adding board",'Dismiss')

            // alert("error adding board")
          }
        })
      }
  }
  openAddBoardDialog()
  {
      this.matDialog.open(AddNewBoardPopupComponent).afterClosed().subscribe(onClosing=>{
        this.addNewBoard()
      })
      
  }
  ngAfterViewInit(): void {
    console.log(this.drawerDetails)
    this.toolbarService.setDrawer(this.drawerDetails)


  }
  signOut()
  {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('email')
    this.loginService.isLoggedIn=false
    this.router.navigateByUrl("login")
  }
  
  selectBoard(board:Board){
      this.selectedBoard=board;
      this.shouldGoHome=false 
      this.changeDisplayToBoard()


  }
  deleteBoard(shouldDeleteBoard:boolean){
    if(shouldDeleteBoard)
    {
      this.boards = this.boards.filter(b=>b!=this.selectedBoard)
      
      console.log("deleting board");
      
      this.backendService.deleteBoardById(this.selectedBoard.boardId).subscribe({
        next:response=>{
          if(response==true)
          {
            this.selectedBoard=undefined as any as Board
        this.snackbarService.openSnackBar("board deleted",'Dismiss')
            
            // alert("board deleted")
          }
        },
        error:err=>{
          console.log(err);
          
        }
      })
    }
  }

  deleteBoardIcon(board:Board){
    let adminEmail:string="";
    for( let member of board.boardMembers)
    {
      if(member.memberAccessLevel=="admin")
      {
        adminEmail=member.memberEmail
      }
    }
    if(sessionStorage.getItem("email")!=adminEmail)
    {
      alert("only admins can delete board")
    }
    if(sessionStorage.getItem("email")==adminEmail && window.confirm("This cannot be undone. Are you sure?"))
    { this.boards = this.boards.filter(b=>b.boardId!=board.boardId)
      this.backendService.deleteBoardById(board.boardId).subscribe({
        next:response=>{
          if(response==true)
          {
            // this.selectedBoard=undefined as any as Board
        this.snackbarService.openSnackBar("board deleted",'Dismiss')

            // alert("board deleted")
          }
        },
        error:err=>{
          console.log(err);
        }
      })}
   
  }
  updateSelectedBoard(board:Board)
  {
    console.log(board);
    
    this.selectedBoard = board;

    for(let boardValue of this.boards)
    {
      if(boardValue.boardId==board.boardId)
      {
        boardValue=board;
        console.log(boardValue);
        
      }
    }

   
    this.backendService.updateBoard(board).subscribe({
      next: result=>{console.log("board updated")
      let msgObj:any ={
        "boardId": board.boardId,
        "sender":sessionStorage.getItem("email") as string
      } 
      this.sendMessage(msgObj)
    },
      error: err=>{
        this.snackbarService.openSnackBar("board deletederror updating board. please try again later",'Dismiss')
        
        // alert("error updating board. please try again later")
      }
      
    });
  }


  openChatBotDialog(){
    this.matDialog.open(ChatbotComponent)
  }


  ngOnInit(): void {
      this.checkUpdate()
    // this.drawer.toggle()
   // this.toolbarService.setDrawer(this.drawerDetails as unknown as MatDrawer);
  }


  sendMessage(message:any) {
    this.stompClient.send(
      '/current/resume',
      {},
      JSON.stringify(message)
    );
  }

  checkUpdate()
  { 
      let shouldUpdate:boolean=false
      const socket = new sock("http://localhost:8087/testchat");
      this.stompClient =  stomp.over(socket)
      const _this = this
      this.stompClient.connect({},(frame)=>{
        _this.stompClient.subscribe("/start/initial",(data)=>{
          let emailVal = JSON.parse( data.body)
          this.boards.forEach(b=>{if(b.boardId==emailVal.boardId)
          {
            shouldUpdate=true
          }})
          console.log("matching board");
          
          if(emailVal.sender!=sessionStorage.getItem("email"))
          {
            this.refreshBoard(emailVal.boardId)
            shouldUpdate=false
          }
          else{
            shouldUpdate=false
          }
          console.log(emailVal);
          
        })
      })

  }

}
