import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardCheckGuard } from './guards/dashboard-check.guard';
import { DashboardLoadGuard } from './guards/dashboard-load.guard';
import { DeactivateGuard } from './guards/deactivate.guard';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './registration/login/login.component';
import { RegisterComponent } from './registration/register/register.component';

const routes: Routes = [
  {
    path:"",
    component:LandingPageComponent
  },

  {
    path:"welcome",
    component:LandingPageComponent
  }
  ,
  {
    path: "registration",
    loadChildren: ()=>import('./registration/registration.module').then(m=>m.RegistrationModule)
  },
  // {
  //   path:"register",
  //   component:RegisterComponent,
  //   canDeactivate:[DeactivateGuard]
    
  // },
  // {
  //   path:"login",
  //   component: LoginComponent,
  //   canDeactivate: [DeactivateGuard]
  // },
  {
    path:"dashboard",
    loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule),
    canActivate:[DashboardCheckGuard]

  }
  // {path:"",
  //   component:AppComponent
  // },
  // 
  // {
  //   path:"login",
  //   component: LoginComponent,
  //   canDeactivate: [DeactivateGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
