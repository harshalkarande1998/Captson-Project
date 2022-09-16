import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialExampleModule } from 'material-example.module';
import { RegistrationRoutingModule } from './registration-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeactivateGuard } from '../guards/deactivate.guard';
import { RegisterComponent } from './register/register.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({

  declarations: [
    LoginComponent,
    RegisterComponent,
    LoadingSpinnerComponent
  
  ],
  
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[LoginComponent, RegisterComponent,LoadingSpinnerComponent]
  
})

export class RegistrationModule { }
