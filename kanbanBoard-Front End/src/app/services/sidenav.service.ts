import { Injectable } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  constructor() { }

  private drawer: MatDrawer | undefined;

  setDrawer(drawer: MatDrawer | undefined) {
      console.log(drawer)
      this.drawer = drawer;
      console.log("int set drawer method ******************* after inti;izing drawer")
  }
  
  toggle(): Promise<MatDrawerToggleResult>|undefined {
    console.log(this.drawer)
    console.log("in toggle method after changing to toggle ")
      return this.drawer?.toggle();
 
  }
}
