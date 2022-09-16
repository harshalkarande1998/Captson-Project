import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private snackBar: MatSnackBar,
  ) { }


  openSnackBar(Massage:any,action:any) {
    let ref=this.snackBar.open(Massage,action,{duration:2000},)
   
  }
}
