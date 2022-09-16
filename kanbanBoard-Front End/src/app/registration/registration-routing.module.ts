import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from '../guards/deactivate.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:"",

    children:[
      {
        path:"",
        redirectTo:"login",
        pathMatch:'full'
        
      },
      {
        path:"register",
        component:RegisterComponent,
        canDeactivate:[DeactivateGuard]
        
      },
      {
        path:"login",
        component: LoginComponent,
        canDeactivate: [DeactivateGuard]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
