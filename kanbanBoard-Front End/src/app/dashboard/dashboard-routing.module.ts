import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { combineLatest } from 'rxjs';
import { DashboardCheckGuard } from '../guards/dashboard-check.guard';
import { BoardComponent } from './board/board.component';
import { ContactComponent } from './contact/contact.component';
import { HelpComponent } from './help/help.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  {
    path:"",
    // pathMatch:"full",
    children:[
      // {
      //   path:"dashboard",
      //   redirectTo:"board",
      //   pathMatch:"prefix"
      // },
      {
        path:"",
        component:NavbarComponent,
        children:[
          {
            path:"",
            component:SidebarComponent
          },
          {
          path: "contact",
          component:ContactComponent,
          pathMatch:"full"
        },
      {
        path:"help",
        component:HelpComponent
      },
    {
      path:"profile",
      component:ProfileComponent
    }]
      },
      {
        path:"board",
        component:BoardComponent
      }
    ]
    ,
    canActivate:[DashboardCheckGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
