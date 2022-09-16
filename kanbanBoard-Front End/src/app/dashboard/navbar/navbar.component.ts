import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BackendRegistrationService } from 'src/app/services/backend-registration.service';
import { BoardTransferService } from 'src/app/services/board-transfer.service';
import { SidenavService } from '../../services/sidenav.service';
import { AddNewBoardPopupComponent } from '../add-new-board-popup/add-new-board-popup.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showSideBar:boolean = true
  shouldAdd:boolean=false
  shouldGoHome:boolean = false
  constructor(private toolbarService:SidenavService, private router:Router,
    private loginService:BackendRegistrationService, private matDialog:MatDialog,
    private boardTransfer:BoardTransferService) { }

  toggleDrawer() {
    this.showSideBar=true
    this.toolbarService.toggle()?.then(resolve=>console.log(resolve));
    // console.log( this.toolbarService.toggle().then)
}

setAddStatus(val:boolean){
this.shouldAdd=false
}

addBoard()
{
  this.showSideBar=true
  this.matDialog.open(AddNewBoardPopupComponent).afterClosed().subscribe(res=>{
    this.shouldAdd=true
    // if(this.boardTransfer.isBoardAdded)
    //   {
    //     this.boardTransfer.getNewBoard()
      
    //   }
  })
}
goHome()
{
  this.showSideBar=true
  this.shouldGoHome=true
}
setShouldGoHomeFalse(val:boolean){
  this.shouldGoHome=val
}

signOut()
{
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('email')
  this.loginService.isLoggedIn=false
  this.router.navigateByUrl("login")
}
  ngOnInit(): void {
    this.router.navigateByUrl("dashboard")
  }

  disableSideBar(){
    this.showSideBar=false
  }

}
